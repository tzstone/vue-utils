// 新的 keyPairs 类型
interface KeyPair {
  leftKey: string;
  rightKey: string;
}

// 类型定义
type JoinType = 'inner' | 'left' | 'right' | 'full';

interface JoinOptions {
  joinType: JoinType;
  // leftSuffix?: string; // 左表字段冲突时的后缀
  rightSuffix?: string; // 右表字段冲突时的后缀
}

/**
 * 输入验证函数
 * @param leftTable 左表数据
 * @param rightTable 右表数据
 * @param keyPairs 连接键对
 * @returns true 如果验证通过
 * @throws Error 如果验证失败
 */
function validateInput(leftTable: any[], rightTable: any[], keyPairs: KeyPair[]) {
  if (!Array.isArray(leftTable) || !Array.isArray(rightTable)) {
    throw new Error('Tables must be arrays');
  }
  if (!Array.isArray(keyPairs) || keyPairs.length === 0) {
    throw new Error('keyPairs must be a non-empty array');
  }

  for (const { leftKey, rightKey } of keyPairs) {
    if (leftKey == '' || rightKey == '') {
      throw new Error('Each keyPair must have string leftKey and rightKey');
    }
  }

  return true;
}

// 检查表是否为空
function isEmptyTable(table: any[]): boolean {
  return !Array.isArray(table) || table.length === 0;
}

// 生成复合 key
function getCompositeKey(row: any, keys: string[]): string {
  return keys.map((key) => row[key]).join('|');
}

// 创建基于 keys 的 null 行
function createNullRowFromKeys(keys: string[]): any {
  const nullRow: any = {};
  for (const key of keys) {
    nullRow[key] = null;
  }
  return nullRow;
}

// 优化的 mergeRows 函数
function mergeRows(leftRow: any, rightRow: any, options: JoinOptions, keyPairs: KeyPair[]): any {
  const { joinType, rightSuffix = '_right' } = options;
  if (!leftRow || !rightRow) return leftRow || rightRow || {};

  // 生成 join key 映射和集合
  const rightKeySet = new Set(keyPairs.map((k) => k.rightKey));
  const result = { ...leftRow };

  for (const [rightKey, rightValue] of Object.entries(rightRow)) {
    // key与左表重复
    if (rightKey in result) {
      // 非join key冲突
      if (!rightKeySet.has(rightKey)) {
        result[`${rightKey}${rightSuffix}`] = rightValue;
      }
      // join key冲突, 跳过
      else continue;
    }
    // join key映射, 如右表b字段对应左表a字段
    // 映射key最终都采用左表的key
    else if (rightKeySet.has(rightKey)) {
      // 左连接, 要么rightValue=leftValue, 要么rightValue为空, 因此以leftValue为准
      if (joinType === 'left') continue;

      // 右连接, 同理, 以rightValue为准
      if (joinType === 'right') {
        const { leftKey } = keyPairs.find((t) => t.rightKey === rightKey);
        result[leftKey] = rightValue;
      }

      // inner和full在join方法里作为完全匹配场景调用mergeRows, 不存在leftValue或rightValue为空场景, 因此不需要处理
    } else {
      result[rightKey] = rightValue;
    }
  }

  return result;
}

// 空表处理函数
function handleEmptyTables(
  leftTable: any[],
  rightTable: any[],
  leftKeys: string[],
  rightKeys: string[],
  options: JoinOptions,
  keyPairs: KeyPair[]
): any[] | null {
  const { joinType } = options;
  const leftEmpty = isEmptyTable(leftTable);
  const rightEmpty = isEmptyTable(rightTable);

  // 两个表都为空
  if (leftEmpty && rightEmpty) {
    return [];
  }

  // 处理单表为空的情况
  if (leftEmpty || rightEmpty) {
    const isLeftEmpty = leftEmpty;
    const nonEmptyTable = isLeftEmpty ? rightTable : leftTable;
    const emptyKeys = isLeftEmpty ? leftKeys : rightKeys;

    // 根据 JOIN 类型决定是否返回结果
    if (
      (isLeftEmpty && (joinType === 'left' || joinType === 'inner')) ||
      (!isLeftEmpty && (joinType === 'right' || joinType === 'inner'))
    ) {
      return [];
    }

    // 返回非空表的所有记录，空表字段为 null
    return nonEmptyTable.map((row) => {
      const nullRow = createNullRowFromKeys(emptyKeys);
      const joinTypeForMerge = isLeftEmpty ? 'right' : 'left';
      return mergeRows(
        isLeftEmpty ? nullRow : row,
        isLeftEmpty ? row : nullRow,
        {
          ...options,
          joinType: joinTypeForMerge,
        },
        keyPairs
      );
    });
  }

  // 没有空表，返回 null 表示需要正常处理
  return null;
}

// 优化的通用 JOIN 函数
function join(leftTable: any[], rightTable: any[], keyPairs: KeyPair[], options: JoinOptions): any[] {
  // 输入验证
  validateInput(leftTable, rightTable, keyPairs);

  const leftKeys = keyPairs.map((k) => k.leftKey);
  const rightKeys = keyPairs.map((k) => k.rightKey);

  // 处理空表情况
  const emptyTableResult = handleEmptyTables(leftTable, rightTable, leftKeys, rightKeys, options, keyPairs);
  if (emptyTableResult !== null) {
    return emptyTableResult;
  }

  const { joinType } = options;
  const result: any[] = [];

  // 构建哈希表
  const leftHash = new Map<string, any[]>();
  const rightHash = new Map<string, any[]>();

  for (const leftRow of leftTable) {
    const key = getCompositeKey(leftRow, leftKeys);
    if (!leftHash.has(key)) leftHash.set(key, []);
    leftHash.get(key)!.push(leftRow);
  }
  for (const rightRow of rightTable) {
    const key = getCompositeKey(rightRow, rightKeys);
    if (!rightHash.has(key)) rightHash.set(key, []);
    rightHash.get(key)!.push(rightRow);
  }

  // 匹配记录
  for (const [key, leftRows] of leftHash) {
    if (rightHash.has(key)) {
      for (const leftRow of leftRows) {
        for (const rightRow of rightHash.get(key)!) {
          result.push(mergeRows(leftRow, rightRow, options, keyPairs));
        }
      }
    }
  }
  // 左独有
  if (joinType === 'left' || joinType === 'full') {
    for (const [key, leftRows] of leftHash) {
      if (!rightHash.has(key)) {
        for (const leftRow of leftRows) {
          const nullRightRow = createNullRowFromKeys(rightKeys);
          result.push(mergeRows(leftRow, nullRightRow, { ...options, joinType: 'left' }, keyPairs));
        }
      }
    }
  }
  // 右独有
  if (joinType === 'right' || joinType === 'full') {
    for (const [key, rightRows] of rightHash) {
      if (!leftHash.has(key)) {
        for (const rightRow of rightRows) {
          const nullLeftRow = createNullRowFromKeys(leftKeys);
          result.push(mergeRows(nullLeftRow, rightRow, { ...options, joinType: 'right' }, keyPairs));
        }
      }
    }
  }
  return result;
}

// 具体 JOIN 函数
export function innerJoin(leftTable: any[], rightTable: any[], keyPairs: KeyPair[], options?: Partial<JoinOptions>) {
  return join(leftTable, rightTable, keyPairs, { joinType: 'inner', ...options });
}

export function leftJoin(leftTable: any[], rightTable: any[], keyPairs: KeyPair[], options?: Partial<JoinOptions>) {
  return join(leftTable, rightTable, keyPairs, { joinType: 'left', ...options });
}

export function rightJoin(leftTable: any[], rightTable: any[], keyPairs: KeyPair[], options?: Partial<JoinOptions>) {
  return join(leftTable, rightTable, keyPairs, { joinType: 'right', ...options });
}

export function fullJoin(leftTable: any[], rightTable: any[], keyPairs: KeyPair[], options?: Partial<JoinOptions>) {
  return join(leftTable, rightTable, keyPairs, { joinType: 'full', ...options });
}
