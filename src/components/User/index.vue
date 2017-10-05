<template lang="html">
  <div class="">
    <v-layout row justify-center style="position: relative;">
      <v-dialog v-model="deleteDialog" lazy absolute>

        <v-card>
          <v-card-title>
            <div class="headline">{{ dialogHeadline }}</div>
          </v-card-title>
          <v-card-text>{{ dialogText }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="" flat="flat" @click.native="deleteDialog = false">batal</v-btn>
            <v-btn class="red--text darken-1" flat="flat" @click.native="onDelete">Hapus</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-card>
      <v-card-title>
         <v-btn light primary dark :to="{name: 'CreateUser'}"><v-icon dark>add</v-icon>Tambah User</v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:search="search"
        >
        <template slot="items" scope="props">
          <td>{{ props.item.email }}</td>
          <td> {{ props.item.roles[0].name }}</td>
          <td style="display: inline-flex">
            <v-btn icon class="green--text" :to="{ name: 'DetailUser', params: { id:props.item.id }}">
              <v-icon>visibility</v-icon>
            </v-btn>
            <v-btn icon class="pink--text" @click.native.stop="confirmDelete(props.item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
        <!-- <template slot="pageText" scope="{ pageStart, pageStop }">
          From {{ pageStart }} to {{ pageStop }}
        </template> -->

      </v-data-table>
    </v-card>
    <v-snackbar
      :success="snackbarContext === 'success'"
      :info="snackbarContext === 'info'"
      :warning="snackbarContext === 'warning'"
      :error="snackbarContext === 'error'"
      :primary="snackbarContext === 'primary'"
      :secondary="snackbarContext === 'secondary'"
      :multi-line="true"
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          { text: 'Email', value: 'email' },
          { text: 'Role', value: 'roles' },
          { text: 'Aksi', value: '' }
        ],
        items: [],
        deleteDialog: false,
        dialogHeadline: '',
        dialogText: '',
        snackbar: false,
        snackbarText: 'Test',
        snackbarContext: '',
        selectedItem: {}
      }
    },
    computed: {
    },
    mounted() {
      this.fetchUsers()
    },
    methods: {
      fetchUsers() {
        this.axios({
          method: 'get',
          url: this.$store.getters.apiUrl + '/Users?filter[include]=profile&filter[include]=roles&access_token=' + this.$store.getters.token
        }).then((hospitals) => {
          this.items = hospitals.data
        }).catch(err => {
          console.log('error when get users : ', err);
        })
      },
      confirmDelete(item) {
        this.dialogHeadline = 'Yakin hapus ' + item.email + ' ?'
        this.dialogText = 'Sekali dihapus, data tidak bisa dikembalikan lagi.'
        this.deleteDialog = true
        this.selectedItem = item
        console.log('item : ', item );
      },
      onDelete() {
        // console.log('item : ', item);
        this.axios({
          method: 'delete',
          url: this.$store.getters.apiUrl + '/Users/' + this.selectedItem.id + '?access_token=' + this.$store.getters.token
        }).then(() => {
          console.log('deleted');
          this.snackbarText = 'Users berhasil di hapus'
          this.snackbarContext = 'success'
          this.deleteDialog = false
          this.snackbar = true
          this.fetchUsers()
        }).catch(err => {
          console.log('ellol : ', err);
          this.snackbarText = 'Users gagal di hapus'
          this.snackbarContext = 'error'
          this.deleteDialog = false
          this.snackbar = true
        })
      }
    }
  }
</script>

<style lang="css">
</style>
