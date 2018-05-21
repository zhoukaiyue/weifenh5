<template>
  <div class="hello">
    <ul>
      <li
      v-for="(list, index) in list"
      :class="{'active':ind === index}"
      @click="changeBgc(index)">{{list}}</li>
    </ul>
  </div>
</template>
<script>
export default {
   data () {
    return {
      list: ['苹果', '香蕉', '菠萝', '芒果'],
      ind: ''
    }
  },
  methods: {
    changeBgc: function (index) {
      this.ind = index
    }
  }
};
</script>
