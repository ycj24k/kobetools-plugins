<template>
  <div class="personal-center">
    <section class="panel profile-panel">
      <header class="panel-header">
        <h2>个人中心</h2>
        <div class="header-actions">
          <span class="action edit">编辑</span>
          <span class="split">|</span>
          <span class="action save">保存</span>
        </div>
      </header>
      <div class="profile-card">
        <div class="profile-left">
          <img class="avatar" :src="userProfile.avatar" alt="avatar">
          <div class="id-info">
            <div class="id-line">
              <span class="label">ID：</span>
              <span class="id">{{ userProfile.id }}</span>
            </div>
            <div class="time-row">
              <span class="label">注册时间：</span>
              <span>{{ userProfile.registerAt }}</span>
            </div>
            <div class="time-row">
              <span class="label">到期时间：</span>
              <span class="expire">{{ userProfile.expireAt }}</span>
            </div>
          </div>
        </div>
        <div class="profile-main">
          <div class="info-grid">
            <div class="info-item">
              <span class="label">用户昵称：</span>
              <span class="value strong">{{ userProfile.nickname }}</span>
            </div>
            <div class="info-item">
              <span class="label">用户身份：</span>
              <span class="value identity-tag">{{ userProfile.identity }}</span>
              <a-button size="mini" class="btn-outline">升级为企业会员</a-button>
            </div>
            <div class="info-item">
              <span class="label">国家：</span>
              <span class="value">{{ userProfile.country }}</span>
            </div>
            <div class="info-item">
              <span class="label">企业名称：</span>
              <span class="value">{{ userProfile.company }}</span>
            </div>
            <div class="info-item">
              <span class="label">用户等级：</span>
              <span class="value">{{ userProfile.level }}</span>
              <a-button size="mini" class="btn-outline">升级会员</a-button>
            </div>
            <div class="info-item">
              <span class="label">会员分组：</span>
              <span class="value">{{ userProfile.group }}</span>
            </div>
            <div class="info-item full">
              <span class="label">API秘钥：</span>
              <span class="value secret">{{ userProfile.apiKey }}</span>
              <a-button size="mini" class="btn-primary">立即充值</a-button>
            </div>
          </div>
        </div>
        <div class="profile-contact">
          <div class="contact-item">
            <span class="label">手机号：</span>
            <span class="value">{{ userProfile.mobile }}</span>
          </div>
          <div class="contact-item">
            <span class="label">联系邮箱：</span>
            <span class="value">{{ userProfile.email }}</span>
          </div>
          <div class="contact-item">
            <span class="label">WhatsApp：</span>
            <span class="value">{{ userProfile.whatsApp }}</span>
          </div>
          <div class="contact-item">
            <span class="label">Facebook：</span>
            <span class="value">{{ userProfile.facebook }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="panel secondary-panel">
      <div class="panel-row">
        <div class="sub-card">
          <header class="sub-header">
            <h3>财务信息</h3>
          </header>
          <div class="finance-body">
            <div class="finance-grid">
              <div class="finance-item">
                <span class="field">我的积分：</span>
                <span class="value highlight">{{ financeInfo.points }}</span>
              </div>
              <div class="finance-item">
                <span class="field">累计充值：</span>
                <span class="value">{{ financeInfo.totalRecharge }} 元</span>
              </div>
              <div class="finance-item">
                <span class="field">累计充值值：</span>
                <span class="value">{{ financeInfo.totalAmount }} 元</span>
              </div>
            </div>
            <div class="finance-actions">
              <a-button class="btn-primary">立即充值</a-button>
              <a-button class="btn-outline">立即充值</a-button>
            </div>
            <div class="finance-tip">
              无需付费，也可以免费获得高级会员权限和积分赠送，点击查看
            </div>
          </div>
        </div>
        <div class="sub-card">
          <header class="sub-header">
            <h3>我的分销</h3>
          </header>
          <div class="distribution-body">
            <div class="dist-link">
              <span class="field">分销链接：</span>
              <a :href="distribution.link" target="_blank">{{ distribution.link }}</a>
              <a-button size="mini" class="btn-outline">立即复制</a-button>
            </div>
            <div class="dist-grid">
              <div class="dist-item">
                <span class="field">分销比例：</span>
                <span class="value highlight">{{ distribution.rate }}</span>
              </div>
              <div class="dist-item">
                <span class="field">推荐人数：</span>
                <span class="value">{{ distribution.referrals }} 人</span>
              </div>
              <div class="dist-item">
                <span class="field">可兑换积分：</span>
                <span class="value">{{ distribution.points }} 个</span>
              </div>
            </div>
            <div class="dist-actions">
              <a-button class="btn-primary">立即充值</a-button>
              <a-button class="btn-outline">立即充值</a-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const userProfile = {
  avatar: 'https://cdn.calfai.com/calfaiStorage/2024/avatar-default.png',
  id: '2345458777',
  nickname: '小三哥',
  country: '美国',
  level: '金钻会员',
  identity: '个人用户',
  company: '深圳市知了网络信息技术有限公司',
  group: '年度会员',
  apiKey:
    '4545754524427475254tyrsf4545754524427475254tyrsf4545754524427475254tyrsf',
  registerAt: '2025-10-25',
  expireAt: '2026-10-25',
  mobile: '+86 13510480364',
  email: '35345346@qq.com',
  whatsApp: '+86 13510480364',
  facebook: 'kobetools',
};

const financeInfo = {
  points: '10000 K币',
  totalRecharge: '1000.00',
  totalAmount: '1000.00',
};

const distribution = {
  link: 'https://www.zhiliaonet.com/fksafkd/fenxiao/fksafkd',
  rate: '10%',
  referrals: 10,
  points: '400000',
};
</script>

<script>
export default {
  name: 'PersonalCenter',
};
</script>

<style lang="less" scoped>
.personal-center {
  padding: 16px 16px 32px;
  background: #f6f7fb;
  min-height: 100%;

  .panel {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e9f5;
    box-shadow: 0 12px 28px rgba(38, 74, 124, 0.08);
    padding: 20px 28px 26px;
    margin-bottom: 24px;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      font-size: 19px;
      font-weight: 600;
      color: #1b1d25;
    }

    .header-actions {
      display: flex;
      align-items: center;
      font-size: 14px;

      .action {
        cursor: pointer;
        user-select: none;

        &.edit {
          color: #2375ff;
        }

        &.save {
          color: #1dbb46;
        }
      }

      .split {
        margin: 0 10px;
        color: #d0d4df;
      }
    }
  }

  .profile-panel {
    .profile-card {
      display: grid;
      grid-template-columns: 300px 1fr 270px;
      gap: 32px;
      align-items: start;
    }

    .profile-left {
      display: flex;
      gap: 16px;
      align-items: center;
      padding-right: 32px;
      border-right: 1px solid #ebf0ff;

      .avatar {
        width: 110px;
        height: 110px;
        border-radius: 14px;
        object-fit: cover;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
      }

      .id-info {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .id-line {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 15px;

          .label {
            color: #1b1d25;
            font-weight: 500;
          }

          .id {
            color: #22a06b;
            font-weight: 600;
          }
        }

        .time-row {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #4f5b6d;
          font-size: 13px;

          .label {
            color: #6a7687;
          }

          .expire {
            color: #f44842;
            font-weight: 600;
          }
        }
      }
    }

    .profile-main {
      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(220px, 1fr));
        column-gap: 32px;
        row-gap: 14px;
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        font-size: 14px;
        color: #4e5969;

        .label {
          color: #1d2129;
          font-weight: 500;
        }

        .value {
          color: #343a46;

          &.strong {
            font-size: 18px;
            font-weight: 600;
          }
        }

        .secret {
          display: inline-block;
          background: #f8fbff;
          border: 1px solid #e0e6f5;
          border-radius: 10px;
          padding: 10px 14px;
          max-width: calc(100% - 160px);
          word-break: break-all;
        }
      }

      .info-item.full {
        grid-column: 1 / -1;
        align-items: center;
      }
    }

    .identity-tag {
      display: inline-flex;
      align-items: center;
      padding: 0 12px;
      height: 22px;
      border-radius: 11px;
      background: #e8f7ee;
      color: #28b561;
      border: 1px solid #afe5c4;
      font-size: 12px;
    }

    .profile-contact {
      border-left: 1px solid #ebf0ff;
      padding-left: 32px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 14px;

      .contact-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4f5b6d;

        .label {
          color: #1d2129;
          font-weight: 500;
          min-width: 90px;
        }
      }
    }
  }

  .secondary-panel {
    .panel-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(360px, 1fr));
      gap: 24px;
    }

    .sub-card {
      background: #fff;
      border: 1px solid #e5e9f5;
      border-radius: 12px;
      padding: 18px 22px 22px;
      box-shadow: 0 6px 18px rgba(42, 72, 130, 0.08);
    }

    .sub-header {
      margin-bottom: 16px;

      h3 {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        color: #1b1d25;
      }
    }

    .finance-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-bottom: 16px;

      .finance-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #4f5b6d;

        .field {
          color: #1d2129;
          font-weight: 500;
        }

        .value {
          color: #4f5b6d;

          &.highlight {
            color: #1b6dff;
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
    }

    .finance-actions,
    .dist-actions {
      display: flex;
      gap: 16px;
      margin: 8px 0 16px;
    }

    .finance-tip {
      margin-top: 6px;
      padding: 14px 26px;
      border-radius: 999px;
      background: linear-gradient(90deg, #0b5eff, #ff1cc8);
      color: #ffffff;
      font-size: 13px;
      font-weight: 500;
      text-align: left;
    }

    .dist-link {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 14px;
      color: #4f5b6d;

      .field {
        color: #1d2129;
        font-weight: 500;
      }

      a {
        color: #1b6dff;
        text-decoration: underline;
      }
    }

    .dist-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px 20px;
      margin: 16px 0;

      .dist-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #4f5b6d;

        .field {
          color: #1d2129;
          font-weight: 500;
        }

        .value {
          color: #4f5b6d;

          &.highlight {
            color: #1b6dff;
            font-weight: 600;
          }
        }
      }
    }
  }
}

.btn-outline {
  background: linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%);
  border: 1px solid #3b7dff;
  color: #2667ff;
  border-radius: 999px;
  padding: 0 16px;
  height: 26px;
  line-height: 24px;
  font-size: 12px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}

.btn-primary {
  background: linear-gradient(90deg, #1d6dff 0%, #4c9bff 100%);
  border: none;
  color: #fff;
  border-radius: 999px;
  padding: 0 18px;
  height: 28px;
  line-height: 26px;
  font-size: 12px;
  box-shadow: 0 6px 16px rgba(54, 115, 255, 0.35);
}
</style>

