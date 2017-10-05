<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <p class="text-xs-center ma-0">Informasi detail pengguna</p>
        <h5 class="text-xs-center pink--text"> {{ user.email }}</h5>
      </v-flex>
    </v-layout>
    <v-layout row class="elevation-1">
      <v-flex xs12 sm6>

        <h6 class="text-xs-center ma-0 pa-4">Profil pengguna</h6>
        <v-divider></v-divider>
        <p class="pa-5" v-if="user.profile">
          <v-icon>home</v-icon> Nama : {{ user.profile.fullName }} <br>
          <v-icon>home</v-icon> Nomor Identitas : {{ user.profile.identityNumber }} <br>
          <v-icon>home</v-icon> Jenis Kelamin : {{ user.profile.gender }} <br>
          <v-icon>home</v-icon> Alamat : {{ user.profile.address }} <br>
          <v-icon>info</v-icon> Phone : {{ user.profile.phone }}
          <br>
          <v-btn default small class="mt-4" @click.native="profileModalToggle">Edit profil pengguna</v-btn>

        </p>
        <p v-else class="text-xs-center pa-5">
          profil pengguna belum diisi <br>
          <v-btn primary @click.native="profileModalToggle">Isi profil pengguna</v-btn>
        </p>

      </v-flex>
      <v-flex xs12 sm6>

        <h6 class="text-xs-center ma-0 pa-4">Peran pengguna</h6>
        <v-divider></v-divider>
        <p class="pa-5" v-if="user.roles">
          <v-icon>home</v-icon> Peran : {{ user.roles[0].name }} <br>
          <v-icon>home</v-icon> Deskripsi peran : {{ user.roles[0].description }} <br>
          <v-btn small class="mt-4" normal>Ganti peran</v-btn>
        </p>
      </v-flex>
    </v-layout>
    <v-dialog v-model="profileModal" persistent width="50%">
      <v-card>
        <v-card-title>
          <span class="headline text-xs-center">Lengkapi profile akun {{ user.email }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 offset-sm3>
                <form class="pb-5">
                  <v-text-field
                    v-model="profile.fullName"
                    label="Nama Lengkap"
                    :error-messages="errors.collect('fullName')"
                    v-validate="'required'"
                    data-vv-name="fullName"
                    data-vv-scope="form-profile"
                    required
                  ></v-text-field>
                  <v-radio-group v-model="profile.gender" row>
                    <v-radio label="Laki-laki" value="men" ></v-radio>
                    <v-radio label="Perempuan" value="woman"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-model="profile.phone"
                    label="Nomor Telfon"
                    :error-messages="errors.collect('phone')"
                    v-validate="'required'"
                    data-vv-scope="form-profile"
                    data-vv-name="phone"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.identityNumber"
                    label="Nomor Identitas"
                    :error-messages="errors.collect('identityNumber')"
                    v-validate="''"
                    data-vv-scope="form-profile"
                    data-vv-name="identityNumber"
                  ></v-text-field>
                  <v-text-field
                    v-model="profile.address"
                    label="Alamat"
                    multi-line
                    :error-messages="errors.collect('address')"
                    v-validate="''"
                    data-vv-scope="form-profile"
                    data-vv-name="address"
                  ></v-text-field>
                </form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="profileModal = false">Close</v-btn>
          <v-btn primary @click.native="saveProfile">Simpan profile</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        user: {},
        profileModal: false,
        profile: {
          fullName: '',
          gender: 'men',
          phone: '',
          address: '',
          identityNumber: ''
        }
      }
    },
    mounted() {
      this.fetchDetailUser()
    },
    methods: {
      profileModalToggle() {
        this.profileModal = !this.profileModal
      },
      fetchDetailUser() {
        this.axios({
          method: 'get',
          url: this.$store.getters.apiUrl + '/users/' + this.$route.params.id + '?filter[include]=profile&filter[include]=roles&access_token=' + this.$store.getters.token
        }).then((user) => {
          this.user = user.data
          if (user.data.profile) {
            this.profile = user.data.profile
          }
        }).catch(err => {
          console.log('error when get detail user : ', err);
        })
      },
      saveProfile() {
        let self = this
        this.$validator.validateAll('form-profile').then((result) => {
          if (result) {
            let requestData = {
              method: 'post',
              url: self.$store.getters.apiUrl + '/users/' + self.user.id + '/profile?access_token=' + this.$store.getters.token,
              data: {
                fullName: self.profile.fullName,
                phone: self.profile.phone,
                gender: self.profile.gender,
                identityNumber: self.profile.identityNumber,
                address: self.profile.address,
                userId: self.user.id
              }
            }
            // edit or create
            if (self.user.profile) {
              requestData.method = 'put'
            }

            self.axios(requestData).then(profile => {
              console.log('berhasil buat / edit profile user : ', self.user.email, profile);
              self.profile = profile.data
              self.user.profile = profile.data
              self.profileModal = false
            }).catch(err => {
              console.log('gagal buat profile user : ', err);
            })
            return
          }
        })
      }
    }
  }
</script>
