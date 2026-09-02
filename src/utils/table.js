// src/utils/table.js
import { h } from 'vue';
import { ElTooltip, ElIcon } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';

export const withTooltipHeader = (label, tooltipContent) => {
  return () => h('div', { style: 'display: flex; align-items: center; gap: 4px; color: #000000' }, [
    h('span', label),
    h(ElTooltip, { content: tooltipContent, placement: 'top' }, {
      default: () => h(ElIcon, { style: 'cursor: pointer; color: #767676' }, 
        () => h(QuestionFilled)
      )
    })
  ]);
};

/**
 * 为 el-descriptions-item 创建带 tooltip 的 label 组件
 * @param {string} label - 显示文本
 * @param {string} tooltipContent - tooltip 提示内容
 * @returns {Object} 组件对象，用于 <component :is="..." />
 */
export const withTooltipLabel = (label, tooltipContent) => {
  return {
    render() {
      return h('div', { style: 'display: flex; align-items: center; gap: 4px;' }, [
        h('span', label),
        h(ElTooltip, { content: tooltipContent, placement: 'top' }, {
          default: () => h(ElIcon, { style: 'cursor: pointer; color: #909399; font-size: 14px;' }, 
            () => h(QuestionFilled)
          )
        })
      ]);
    }
  };
};