<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :form="form" @submit="searchList">
        <div :class="advanced ? null: 'fold'">
          <a-row>
            <a-col :md="10" :sm="24">
              <a-form-item
                      label="缴费人姓名"
                      :labelCol="{span: 5}"
                      :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input
                        v-decorator="['applicantName', { rules: [{ required: false}] }]"
                        placeholder="请输入"
                />
              </a-form-item>
            </a-col>
            <a-col :md="14" :sm="24">
              <a-form-item
                      label="缴费人证件号码"
                      :labelCol="{span: 5}"
                      :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input-number
                        v-decorator="['applicantCertNo', { rules: [{ required: false}] }]"
                        style="width: 100%" placeholder="请输入"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <a-col :md="10" :sm="24">
              <a-form-item
                      label="录屏开始时间"
                      :labelCol="{span: 5}"
                      :wrapperCol="{span: 18, offset: 1}"
              >
                <a-date-picker
                        v-decorator="['beginTime', { rules: [{ required: false}] }]"
                        style="width: 100%" placeholder="选择时间"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="searchList">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'"/>
          </a>
        </span>
      </a-form>
    </div>
    <div>
      <standard-table
              :columns="columns"
              :dataSource="dataSource"
              rowKey="orderNo"
              @clear="onClear"
              @change="onChange"
              @selectedRowChange="onSelectChange"
              :pagination="{
              current: pageNo,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              showLessItems: true,
              showQuickJumper: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，总计 ${total} 条`,
              onChange: onPageChange,
              onShowSizeChange: onSizeChange,
            }"
      >
        <div slot="action" slot-scope="{text, record}">
          <a style="margin-right: 8px" @click="handleRecord(record)">
            播放视频
          </a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle"/>
        </template>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
  import StandardTable from '@/components/table/StandardTable'
  import {monitorByOrderNoUrl, monitorMainOneUrl} from "../../../services/dataSource";
  import {S_OK} from "../../../utils/constant";
  // import {monitorMainOneUrl} from "../../../services/dataSource";

  const columns = [
    {
      title: '序号',
      dataIndex: 'key'
    },
    {
      title: '订单ID',
      dataIndex: 'orderNo'
    },
    {
      title: '产品Code',
      dataIndex: 'productCode'
    },
    {
      title: '缴费人姓名',
      dataIndex: 'applicantName'
    },
    {
      title: '缴费人证件类型',
      dataIndex: 'applicantType'
    },
    {
      title: '缴费人证件号码',
      dataIndex: 'applicantCertNo'
    },
    {
      title: '设备号',
      dataIndex: 'equipment',
      ellipsis: true,
    },
    {
      title: '开始时间',
      dataIndex: 'createTime'
    },
    {
      title: '视频时长',
      dataIndex: 'duration',
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
    },
    {
      title: '视频状态',
      dataIndex: 'status',
      sorter: true
    },
    {
      title: '编辑',
      dataIndex: '',
      scopedSlots: {customRender: 'action'}
    }
  ]

  export default {
    name: 'QueryList',
    components: {StandardTable},
    data() {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        form: this.$form.createForm(this),
        pageNo: 1,
        pageSize: 10,
        total: 0,
        conditions: '',
        dataObj: {},
        travel: []
      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    created() {
      let params = {
        applicantName: '',
        applicantCertNo: '',
        beginTime: ''
      }
      this.getDataList(params)
    },
    methods: {
      searchList() {
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.getDataList(values)
          }
        })
      },
      async getDataList() {
        const {pageNo, pageSize, conditions} = this
        let result = await monitorMainOneUrl({pageNo, pageSize, ...conditions})
        const {list, total} = result.data.result
        this.dataSource = list.map((val, index) => {
          return Object.assign({}, val, {key: index + 1})
        })

        this.pageNo = pageNo
        this.total = total
        this.pageSize = pageSize
      },
      async handleRecord(v) {
        const result = await monitorByOrderNoUrl({orderNo: v})
        if (result.code === S_OK) {
          this.dataObj = result.result.events
          this.travel = result.result.tracks
          this.$router.push('/form/replay')
        }
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      onClear() {
        this.$message.info('您清空了勾选的所有行')
      },
      onStatusTitleClick() {
        this.$message.info('你点击了状态栏表头')
      },
      onChange() {
        this.$message.info('表格状态改变了')
      },
      onSelectChange() {
        this.$message.info('选中行改变了')
      },
      onPageChange(pageNo, pageSize) {
        this.pageNo = pageNo
        this.pageSize = pageSize
        this.getDataList()
      },
      onSizeChange(current, size) {
        this.pageNo = 1
        this.pageSize = size
        this.getDataList()
      },
      onReset(conditions) {
        this.conditions = conditions
        this.getDataList()
      },
      onRefresh(conditions) {
        this.conditions = conditions
        this.getDataList()
      },
    }
  }
</script>

<style lang="less" scoped>
  .search {
    margin-bottom: 54px;
  }

  .fold {
    width: calc(100% - 216px);
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
