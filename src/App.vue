<template>
  <div class="kng-search">
    <div class="flex-box">
      <el-input class="flex-box-left" v-model="keyword" @input="onInput" />
      <el-button class="flex-box-right" @click="openAdd">Add</el-button>
    </div>
    <div>
      <div v-for="row in dataList" :key="row._id">
        <el-divider />
        <div class="flex-box">
          <div class="flex-box-left multi">{{ row._source.content }}</div>
          <el-button class="flex-box-right" @click="openEdit(row)">Edit</el-button>
          <el-popconfirm title="Delete?" @confirm="del(row._id)">
            <template #reference>
              <el-button class="flex-box-right">Del</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>

    <el-dialog v-model="showModal">
      <div>
        <el-input type="textarea" v-model="newContent" :rows="10"></el-input>
      </div>
      <template #footer>
        <el-button type="primary" @click="doAddOrUpdate">Add/Update</el-button>
        <el-button @click="close">Close</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// @ts-ignore
import { deleteById, insert, queryMatch, updateById } from './node/curd.js';

interface DataList {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    content: string;
    v?: number;
  };
  _type: string;
}

const keyword = ref('');
const newContent = ref('');
const currentId = ref('');
const showModal = ref(false);
const dataList = ref<DataList[]>([]);

function openAdd() {
  currentId.value = '';
  newContent.value = '';
  showModal.value = true;
}

function close() {
  showModal.value = false;
  currentId.value = '';
  newContent.value = '';
}

function openEdit(row: DataList) {
  currentId.value = row._id;
  newContent.value = row._source.content;
  showModal.value = true;
}

async function doAddOrUpdate() {
  if (currentId.value) {
    await updateById(currentId.value, newContent.value, 10);
  } else {
    await insert(newContent.value, 10);
  }
  close();
  setTimeout(() => {
    onInput();
  }, 1000);
}

async function del(id: string) {
  await deleteById(id);
  setTimeout(() => {
    onInput();
  }, 1000);
}

async function onInput() {
  const res = await queryMatch(keyword.value);
  dataList.value = res.data['hits']['hits'];
}
</script>

<style lang="scss">
@import 'element-plus/dist/index.css';
.kng-search {
  @import './assets/app.scss';
  padding: 10px;
  .flex-box {
    display: flex;
    .flex-box-left {
      flex: 1;
      font-size: 12px;
      margin-right: 10px;
    }
  }
  .multi {
    white-space: pre-line;
  }
}
</style>
