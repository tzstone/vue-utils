export interface Context {
  params?: any; // 外部参数
  filterParams?: ({ key: string } | ((key: string) => boolean))[]; // 接口参数列表
  request: {
    // 请求配置
    sourceType: string; // 数据源类型，如 'http' 或 'ws'
    [key: string]: any;
  };
  useContext?: any; // 上下文
  requestTransform?: string;
  statusCodeTransform?: string; // 状态码转换规则
  parseResponse?: any; // 响应解析规则
  responseTransform?: string;
  processResponse?: any; // 处理响应数据
  response?: any; // 响应数据
}

export type Middleware<T> = (ctx: T, next: (cont?: boolean) => void) => void;

class Pipeline<T> {
  private middlewares: Middleware<T>[] = [];

  use(mw: Middleware<T>) {
    this.middlewares.push(mw);
    return this;
  }

  run(ctx: T, done: (ctx: T) => void) {
    const dispatch = (i: number) => {
      if (i < this.middlewares.length) {
        this.middlewares[i](ctx, (cont = true) => {
          if (cont === false) return done(ctx);
          dispatch(i + 1);
        });
      } else {
        done(ctx);
      }
    };
    dispatch(0);
  }
}

// ----------- 通用中间件示例 -----------

export const filterParams = (params, filterParams) => {
  if (!params || !filterParams?.length) return params;

  return Object.fromEntries(
    Object.entries(params).filter(([key, v]) =>
      filterParams.some((p) => {
        if (typeof p === 'function') return p(key);
        if (typeof p === 'object' && p.key) return p.key === key;
        return false;
      })
    )
  );
};

// 请求预处理
export const requestTransform = (requestTransform, params, useContext) => {
  if (!requestTransform) return params;

  try {
    const fn = new Function('params, useContext', requestTransform);
    params = fn(params, useContext);
  } catch (e) {
    console.error('请求预处理错误', e);
  }

  return params;
};

export const sendRequest = (request, params, statusCodeTransform, callback) => {
  // fetch
  // ctx.response = xxx;
  // error
  // next(false)
  callback();
};

export const parseResponse = (response, parseConfig) => {
  if (!parseConfig) return response;
  // parseResponse
  // ctx.response = xxx
  return response;
};

export const responseTransform = (responseTransform, response, useContext) => {
  if (!responseTransform) return response;

  try {
    const fn = new Function('data, useContext', responseTransform);
    response = fn(response, useContext);
  } catch (e) {
    console.error('响应预处理错误', e);
  }

  return response;
};

export const processResponse = (processResponse, response) => {
  if (!processResponse) return response;
  // processResponse
  // ctx.response = xxx
  return response;
};

// HTTP请求管道
export const requestPipeline = new Pipeline<Context>()
  // 参数过滤
  .use((ctx, next) => {
    ctx.params = filterParams(ctx.params, ctx.filterParams);
    next();
  })
  // 请求参数处理
  .use((ctx, next) => {
    ctx.params = requestTransform(ctx.requestTransform, ctx.params, ctx.useContext);
    next();
  })
  // 发送请求
  .use((ctx, next) => {
    sendRequest(ctx.request, ctx.params, ctx.statusCodeTransform, (response) => {
      ctx.response = response;
      // if (ctx.response.code !== 200) return next(false); // 中断
      next();
    });
  })
  // 响应解析
  .use((ctx, next) => {
    ctx.response = parseResponse(ctx.response, ctx.parseResponse);
    next();
  })
  // 响应转换
  .use((ctx, next) => {
    ctx.response = responseTransform(ctx.responseTransform, ctx.response, ctx.useContext);
    next();
  })
  // 响应处理
  .use((ctx, next) => {
    ctx.response = processResponse(ctx.processResponse, ctx.response);
    next();
  });

export function request(ctx: Context, callback: (response?: any) => void) {
  requestPipeline.run(ctx, () => {
    callback(ctx.response);
  });
}
