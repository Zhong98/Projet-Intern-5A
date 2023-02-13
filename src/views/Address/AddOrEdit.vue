<template>
  <div class='container'>
    <Header>
      <span v-if="!id">添加地址</span>
      <span v-else>编辑地址</span>
    </Header>
    <section>
      <van-address-edit
          v-if="!id"
          :area-list="areaList"
          show-set-default
          show-search-result
          @save="onSave"
      />

      <van-address-edit
          v-else
          :area-list="areaList"
          show-delete
          :address-info="addressEditInfo"
          show-set-default
          show-search-result
          @save="onSave"
          @delete="onDelete"
      />
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import {Dialog, AddressEdit} from 'vant';
import Header from '@/components/address/Header.vue'
import TabBar from '@/components/common/Tabbar.vue'
import http from "@/common/api/request"
import {mapState} from "vuex";

export default {
  data() {
    return {
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市',
        },
        city_list: {
          110100: '北京市',
          120100: '天津市',
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          120101: '塘沽区',
        },
      },
      id: 0,
      address: {},
      addressEditInfo: {},
    };
  },
  computed: {
    ...mapState({
      addressList: state => state.address.list
    })
  },
  components: {
    Header,
    TabBar,
    [AddressEdit.name]: AddressEdit,
  },
  methods: {
    onSave(content) {
      content.isDefault = content.isDefault === true ? 1 : 0
      http.$axios({
        url: '/api/addOrEditAddress',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          ...content,
          action: this.id //Transmettre l'addressId au backend，Si l'addressID est 0，l'action est 'Ajouter une nouvelle adresse'，Sinon 'Modifier une adresse'
        }
      }).then(res => {
        if (res.success) {
          this.$router.push('/address')
        }
      })
    },
    onDelete() {
      Dialog.confirm({
        message: '确认删除当前地址吗？',
      }).then(() => {
        // on confirm
        http.$axios({
          url: '/api/deleteAddress',
          method: 'POST',
          data: {
            id : this.id //Transmettre l'addressId au backend
          }
        }).then(res => {
          if (res.success) {
            this.$router.push('/address')
          }
        })
      })
    }
  },
  created() {
    if (this.$route.query.id) { //S'il existe l'addressID, l'action est 'Modifier', sinon 'Ajouter'
      this.id = parseInt(this.$route.query.id)
      this.addressEditInfo = this.addressList.find((value) => value.id === this.id);
      this.addressEditInfo.isDefault = this.addressEditInfo.isDefault === 1
    }
  }
}
</script>

<style lang='scss' scoped>
Header span {
  font-size: .48rem;
}

section {
  flex: 1;
  background-color: #F7F7F7;

  .van-address-edit {
    padding: 0;
  }

  ::v-deep .van-address-edit__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep .van-button--danger {
    width: 8rem;
    height: 1.066666rem;
    background-color: #b0352f;
  }
}

::v-deep .tabbar {
  border-top: 2px solid #ccc;
}
</style>
