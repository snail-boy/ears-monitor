<template>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form>
        <a-form-item
                :label="$t('fileName')"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 10}"
        >
          <a-input v-model="fileName" :placeholder="$t('fileNameInput')" />
        </a-form-item>
        <a-form-item
                :label="$t('name')"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 10}"
        >
          <a-input v-model="settingObj.projectName" :placeholder="$t('nameInput')" />
        </a-form-item>
        <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
          <a-button type="primary" @click='save'>新建项目</a-button>
<!--          <a-button style="margin-left: 8px">{{$t('save')}}</a-button>-->
        </a-form-item>
      </a-form>
    </a-card>
<!--    <a-form-item :wrapperCol="{span: 17, offset: 7}">-->
<!--      <a-button type="primary" @click="nextStep">{{$t('nextStep')}}</a-button>-->
<!--    </a-form-item>-->
</template>

<script>
export default {
  name: 'Step1',
  i18n: require('./i18n'),
  data() {
    return {
      fileName: '',
      settingObj: {
        projectName: '',
        baseColor: '',
        isCountDown: '',
        expiryDate: ''
      }
    }
  },
  computed: {
    desc() {
      return this.$t('pageDesc')
    }
  },
  methods: {
    save: function () {
      console.log(this.settingObj)
      sessionStorage.setItem('settingObj', JSON.stringify(this.settingObj))
      this.$emit('nextStep')
    },
    onChange(date, dateString) {
      this.settingObj.expiryDate = dateString + ' 24:00:00'
    }
  }
}
</script>

<style scoped>

</style>
