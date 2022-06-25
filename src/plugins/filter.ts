// 全局过滤器
import Vue from 'vue'
import * as filters from '@/filters'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
