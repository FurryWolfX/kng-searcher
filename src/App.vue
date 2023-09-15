<template>
  <div class="kng-search">
    <div class="flex-box">
      <n-input class="flex-box-left" v-model:value="keyword" @input="onInput" />
      <n-button class="flex-box-right" @click="openAdd">Add</n-button>
    </div>
    <div>
      <n-list>
        <n-list-item v-for="row in dataList" :key="row._id">
          <div class="flex-box">
            <div class="flex-box-left multi">{{ row._source.content }}</div>
            <n-button class="flex-box-right" @click="openEdit(row)">Edit</n-button>
            <n-popconfirm @positive-click="del(row._id)">
              Delete?
              <template #trigger>
                <n-button class="flex-box-right">Del</n-button>
              </template>
            </n-popconfirm>
          </div>
        </n-list-item>
      </n-list>
    </div>

    <n-modal v-model:show="showModal" preset="dialog">
      <div>
        <n-input
          v-model:value="newContent"
          class="flex-box-left"
          type="textarea"
          placeholder="自动调整尺寸"
          :autosize="{
            minRows: 3,
          }"
        />
      </div>
      <template #action>
        <n-button class="flex-box-right" @click="doAddOrUpdate">Add/Update</n-button>
        <n-button class="flex-box-right" @click="close">Close</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NInput, NList, NListItem, NModal, NPopconfirm } from 'naive-ui';
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

<style scoped lang="scss">
.kng-search {
  .flex-box {
    display: flex;
    padding-left: 12px;

    .flex-box-left {
      flex: 1;
      font-size: 12px;
    }
  }

  .multi {
    white-space: pre-line;
  }
}
</style>
