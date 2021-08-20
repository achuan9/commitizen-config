module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['CCP-']
    }
  },
  prompt: {
    messages: {
      skip: '可回车跳过',
      max: '最多%d个字符',
      min: '最少%d个字符',
      emptyWarning: '必填',
      upperLimitWarning: '超出限制',
      lowerLimitWarning: '低于限制'
    },
    questions: {
      type: {
        description: "选择提交的类型",
        enum: {
          feat: {
            description: '新功能',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '修复BUG',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '修改文档',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '不影响代码运行',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '既不修复错误也不添加功能的代码更改',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '为了提升性能的修改',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或纠正现有的测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: '影响构建系统或外部依赖项的更改 (example scopes: gulp, webpack, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: '对我们的 CI 配置文件和脚本的更改 (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "不修改 src 或测试文件的其他更改",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '恢复之前的提交',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          '修改的范围，例如模块、组件或文件名',
      },
      subject: {
        description: '写一个简短的变化描述',
      },
      body: {
        description: '详细的变化描述',
      },
      isBreaking: {
        description: '是否有任何重大变化？',
      },
      breakingBody: {
        description:
          '重大变化提交必须填写body',
      },
      breaking: {
        description: '描述重大变化',
      },
      isIssueAffected: {
        description: '受否影响打开的issue？',
      },
      issuesBody: {
        description:
          '如果问题已关闭，则提交需要一个正文。请输入对提交本身的更长描述',
      },
      issues: {
        description: '添加问题参考(e.g. "fix #123", "re #123".)',
      },
    },
  }
};