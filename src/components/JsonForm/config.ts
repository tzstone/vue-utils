import { Message } from 'element-ui';

import { FormItem } from './type';

const defElementConfig = {
  input: {
    component: 'el-input',
    props: {
      clearable: true,
    },
  },
  search: {
    component: 'el-input',
    props: {
      clearable: true,
      prefixIcon: 'el-icon-search',
    },
  },
  select: {
    component: 'el-select',
    props: {
      clearable: true,
      filterable: true,
    },
  },
  checkbox: {
    component: 'el-checkbox',
  },
  checkboxGroup: {
    component: 'el-checkbox-group',
  },
  date: {
    component: 'el-date-picker',
    props: {
      type: 'date',
      placeholder: '选择日期',
      valueFormat: 'yyyy-MM-dd',
    },
  },
  dateRange: {
    component: 'el-date-picker',
    props: {
      type: 'daterange',
      valueFormat: 'yyyy-MM-dd',
      rangeSeparator: '至',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  },
  upload: {
    component: 'el-upload',
    props: {
      action: '',
      limit: 1,
      autoUpload: false,
      listType: 'picture-card',
      accept: 'image/*',
      maxSize: 30, // kb
    },
  },
};

const enhanceConfig = {
  upload: (item: FormItem, props, form) => {
    const { field } = item;
    if (props.limit == 1 && !item.runtimeProps) {
      item.runtimeProps = (form) => {
        return { fileList: form[field] ? [{ url: form[field] }] : [] };
      };
    }

    if (props.maxSize) {
      const rawOnChange = props['onChange'];
      props['onChange'] = function (file, fileList) {
        const isLtSize = file.size / 1024 < props.maxSize;
        if (!isLtSize) {
          Message.warning(`上传文件大小不能超过 ${props.maxSize}KB!`);
          fileList.pop();
          return;
        }

        rawOnChange?.(file, fileList);
      };
    }

    if (props.limit && !props['onExceed']) {
      props['onExceed'] = (files, fileList) => {
        Message.warning(`超出文件个数限制, 当前限制${props.limit}个文件`);
      };
    }
  },
};

export function getElementConfig(item: FormItem, form) {
  const { type } = item;
  const { component, props: defProps } = defElementConfig[type] || {};
  const props = Object.assign({}, defProps || {}, item.props || {});

  enhanceConfig[type]?.(item, props, form);

  const runtimeProps = item.runtimeProps;

  return {
    component,
    props,
    runtimeProps,
  };
}
