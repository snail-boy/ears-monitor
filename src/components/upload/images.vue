<template>
  <div>
    <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture"
            :default-file-list="fileList"
            class="upload-list-inline"
    >
      <a-button> <a-icon type="upload" /> {{btnName}} </a-button>
    </a-upload>
  </div>
</template>

<script>
  export default {
    name: 'Images',
    props: {
      btnName: {
        type: String,
        default: 'upload'
      },
    },
    data() {
      return {
        fileList: [
          {
            uid: '-2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
      };
    },
  };
</script>
<style scoped>
  /* tile uploaded pictures */
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>
