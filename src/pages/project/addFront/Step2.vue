<template>
  <a-form>
    <a-form-item
            :label="$t('baseColor')"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
    >
      <a-input v-model="settingObj.baseColor" :placeholder="$t('baseColorInput')" />
    </a-form-item>
    <a-form-item
            :label="$t('isCountDown')"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
            :required="false"
    >
      <a-radio-group v-model="settingObj.isCountDown">
        <a-radio :value="true">是</a-radio>
        <a-radio :value="false">否</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
            :label="$t('expiryDate')"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
    >
      <a-date-picker @change="onChange" style="width: 100%" />
    </a-form-item>
    <a-form-item
            label="文件上传"
            :labelCol="{span: 2}"
            :wrapperCol="{span: 24}"
    >
      <a-card class='upload-box' title="首页图片上传">
        <a-card-grid>
          <images btn-name='首页顶部'></images>
        </a-card-grid>
        <a-card-grid>
          Content
        </a-card-grid>
        <a-card-grid>
          Content
        </a-card-grid>
        <a-card-grid>
          Content
        </a-card-grid>
        <a-card-grid>
          Content
        </a-card-grid>
        <a-card-grid>
          Content
        </a-card-grid>
        <a-card-grid>
          Content
        </a-card-grid>
        <a-card-grid>
          Content
        </a-card-grid>
      </a-card>
    </a-form-item>
    <a-form-item :wrapperCol="{span: 17, offset: 7}">
      <a-button :loading="loading" type="primary" @click="nextStep">生成项目</a-button>
      <!--        <a-button style="margin-left: 8px" @click="prevStep">{{$t('preStep')}}</a-button>-->
    </a-form-item>
  </a-form>
</template>

<script>
import Images from "../../../components/upload/images";
export default {
  name: 'Step2',
  components: {Images},
  i18n: require('./i18n'),
  data () {
    return {
      loading: false,
      settingObj: {
        projectName: '',
        baseColor: '',
        isCountDown: '',
        expiryDate: ''
      }
    }
  },
  methods: {
    nextStep () {
      let _this = this
      _this.loading = true
      setTimeout(function () {
        _this.$emit('nextStep')
      }, 1500)
    },
    prevStep () {
      this.$emit('prevStep')
    }
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;
    :global {
      .ant-form-item-label,
      .ant-form-item-control {
        line-height: 22px;
      }
    }
  }
  .upload-box {
    .ant-card-grid {
      width: 50%;
      min-height: 200px;
    }
  }
</style>
