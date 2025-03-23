/**
 * 元素追踪数据接口
 */
interface TrackingData {
  startTime: number; // 当前可见性状态开始的时间戳
  totalDuration: number; // 累计可见时长（毫秒）
  isVisible: boolean; // 当前是否可见
  elementId: string; // 元素唯一标识
}

/**
 * 上报数据接口
 */
interface TrackReport {
  elementId: string; // 元素唯一标识
  duration: number; // 访问时长（毫秒）
  path: string; // 页面路径
  timestamp: number; // 上报时间戳
}

/**
 * 元素访问时长追踪器
 * 用于追踪页面元素的可见时长，支持多个元素同时追踪
 */
class ElementTracker {
  private trackingMap: WeakMap<Element, TrackingData>; // 使用 WeakMap 存储追踪数据，避免内存泄漏
  private intersectionObserver: IntersectionObserver; // 用于监测元素可见性
  private isPageVisible: boolean; // 页面是否可见
  private readonly reportUrl: string; // 数据上报接口地址

  /**
   * 创建追踪器实例
   * @param reportUrl - 数据上报接口地址
   * @param options - IntersectionObserver 配置项
   */
  constructor(
    reportUrl: string,
    options: IntersectionObserverInit = { threshold: 0.5 } // 默认元素可见面积超过 50% 才计算
  ) {
    this.trackingMap = new WeakMap();
    this.reportUrl = reportUrl;
    this.isPageVisible = !document.hidden;

    // 创建 IntersectionObserver 实例
    this.intersectionObserver = new IntersectionObserver(
      (entries) => entries.forEach(this.handleIntersection.bind(this)),
      options
    );

    this.initializeEventListeners();
  }

  /**
   * 初始化事件监听
   */
  private initializeEventListeners(): void {
    // 监听页面可见性变化（处理页面切换、最小化等情况）
    document.addEventListener('visibilitychange', () => {
      const wasVisible = this.isPageVisible;
      this.isPageVisible = !document.hidden;

      if (wasVisible !== this.isPageVisible) {
        this.updateAllElementsTracking(this.isPageVisible);
      }
    });

    // 页面关闭前上报所有追踪数据
    window.addEventListener('beforeunload', () => {
      this.reportAllTracking();
    });
  }

  /**
   * 更新所有被追踪元素的状态
   * @param isVisible - 是否可见
   */
  private updateAllElementsTracking(isVisible: boolean): void {
    const now = Date.now();
    const elements = this.getAllTrackedElements();

    elements.forEach((element) => {
      const data = this.trackingMap.get(element);
      if (!data) return;

      if (data.isVisible && !isVisible) {
        // 从可见变为不可见，累加时长
        data.totalDuration += now - data.startTime;
        data.isVisible = false;
      } else if (!data.isVisible && isVisible) {
        // 从不可见变为可见，重新开始计时
        data.startTime = now;
        data.isVisible = true;
      }
    });
  }

  /**
   * 获取所有正在追踪的元素
   * @returns 元素数组
   */
  private getAllTrackedElements(): Element[] {
    const elements: Element[] = [];
    const iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node: Node) => {
        return this.trackingMap.has(node as Element) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    let node;
    while ((node = iterator.nextNode())) {
      elements.push(node as Element);
    }
    return elements;
  }

  /**
   * 上报追踪数据
   * @param elementId - 元素ID
   * @param duration - 访问时长
   */
  private async reportTracking(elementId: string, duration: number): Promise<void> {
    if (duration <= 0) return;

    const reportData: TrackReport = {
      elementId,
      duration,
      path: window.location.pathname,
      timestamp: Date.now(),
    };

    try {
      // 优先使用 sendBeacon，这个 API 更适合页面关闭时发送数据
      if (navigator.sendBeacon) {
        navigator.sendBeacon(this.reportUrl, JSON.stringify(reportData));
      } else {
        // 降级使用 fetch，添加 keepalive 确保数据发送
        await fetch(this.reportUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reportData),
          keepalive: true,
        });
      }
    } catch (error) {
      console.error('Failed to report tracking data:', error);
    }
  }

  /**
   * 上报所有元素的追踪数据
   */
  private reportAllTracking(): void {
    const elements = this.getAllTrackedElements();
    elements.forEach((element) => {
      const data = this.trackingMap.get(element);
      if (data) {
        const duration = this.getDuration(element);
        this.reportTracking(data.elementId, duration);
      }
    });
  }

  /**
   * 开始追踪元素
   * @param element - 要追踪的 DOM 元素
   * @param elementId - 元素唯一标识
   */
  public track(element: Element, elementId: string): void {
    if (this.trackingMap.has(element)) {
      return;
    }

    this.trackingMap.set(element, {
      startTime: this.isPageVisible ? Date.now() : 0,
      totalDuration: 0,
      isVisible: this.isPageVisible,
      elementId,
    });

    this.intersectionObserver.observe(element);
  }

  /**
   * 停止追踪元素并上报数据
   * @param element - 要停止追踪的 DOM 元素
   */
  public untrack(element: Element): void {
    const data = this.trackingMap.get(element);
    if (!data) return;

    const finalDuration = this.getDuration(element);
    this.reportTracking(data.elementId, finalDuration);

    this.intersectionObserver.unobserve(element);
    this.trackingMap.delete(element);
  }

  /**
   * 获取元素的当前访问时长
   * @param element - DOM 元素
   * @returns 访问时长（毫秒）
   */
  public getDuration(element: Element): number {
    const data = this.trackingMap.get(element);
    if (!data) return 0;

    let duration = data.totalDuration;
    if (data.isVisible && this.isPageVisible) {
      duration += Date.now() - data.startTime;
    }

    return duration;
  }

  /**
   * 处理元素可见性变化
   * @param entry - IntersectionObserver 条目
   */
  private handleIntersection(entry: IntersectionObserverEntry): void {
    const element = entry.target;
    const data = this.trackingMap.get(element);

    if (!data || !this.isPageVisible) return;

    const now = Date.now();
    if (entry.isIntersecting && !data.isVisible) {
      // 元素变为可见
      data.isVisible = true;
      data.startTime = now;
    } else if (!entry.isIntersecting && data.isVisible) {
      // 元素变为不可见
      data.isVisible = false;
      data.totalDuration += now - data.startTime;
    }
  }
}

export default ElementTracker;
