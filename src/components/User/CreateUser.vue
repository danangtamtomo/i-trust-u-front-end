<template>
  <v-layout row fluid class="elevation-1" style="background-color: white;">
    <v-flex xs12>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step > 1">Buat Akun</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="step > 2">Lengkapi Profil</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Pilih Role / Peran</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
            <v-flex xs12 sm6 offset-sm3>
              <br>
              <h5 class="text-xs-center">Buat akun user baru</h5>
              <form class="pb-5">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :error-messages="errors.collect('email')"
                  v-validate="'required|email'"
                  data-vv-name="email"
                  data-vv-scope="form-account"
                  required
                  :disabled="emailDisabled"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :counter="5"
                  :error-messages="errors.collect('password')"
                  v-validate="'required|min:6'"
                  data-vv-scope="form-account"
                  data-vv-name="password"
                  required
                  hint="setidaknya 6 karakter"
                  min="6"
                  :disabled="passwordDisabled"
                  :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (passwordVisibility = !passwordVisibility)"
                  :type="passwordVisibility ? 'password' : 'text'"
                ></v-text-field>
              </form>
            </v-flex>
          <v-btn primary @click.native="createAccountStep">Buat Akun</v-btn>
          <!-- <v-btn primary @click.native="step = 2">Continue</v-btn> -->

        </v-stepper-content>
        <v-stepper-content step="2">
          <v-flex xs12 sm6 offset-sm3>
            <br>
            <h5 class="text-xs-center">Lengkapi profile akun {{ email }}</h5>
            <form class="pb-5">
              <v-text-field
                v-model="fullName"
                label="Nama Lengkap"
                :error-messages="errors.collect('fullName')"
                v-validate="'required'"
                data-vv-name="fullName"
                data-vv-scope="form-profile"
                required
                :disabled="fullNameDisabled"
              ></v-text-field>
              <v-radio-group v-model="gender" row :disabled="genderDisabled">
                <v-radio label="Laki-laki" value="men" ></v-radio>
                <v-radio label="Perempuan" value="woman"></v-radio>
              </v-radio-group>
              <v-text-field
                v-model="phone"
                label="Nomor Telfon"
                :error-messages="errors.collect('phone')"
                v-validate="'required'"
                data-vv-scope="form-profile"
                data-vv-name="phone"
                required
                :disabled="phoneDisabled"
              ></v-text-field>
              <v-text-field
                v-model="identityNumber"
                label="Nomor Identitas"
                :error-messages="errors.collect('identityNumber')"
                v-validate="''"
                data-vv-scope="form-profile"
                data-vv-name="identityNumber"
                :disabled="identityNumberDisabled"
              ></v-text-field>
              <v-text-field
                v-model="address"
                label="Alamat"
                multi-line
                :error-messages="errors.collect('address')"
                v-validate="''"
                data-vv-scope="form-profile"
                data-vv-name="address"
                :disabled="addressDisabled"
              ></v-text-field>
            </form>
          </v-flex>
          <v-btn primary @click.native="createProfileStep">Lanjutkan</v-btn>
          <!-- <v-btn primary @click.native="step = 3">Continue</v-btn> -->

          <v-btn flat @click.native="step = 1">Kembali</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-flex xs12 sm6 offset-sm3>
            <br>
            <h5 class="text-xs-center">Pilih role untuk {{ fullName }}</h5>
            <v-select
              v-bind:items="rolesItems"
              v-model="roleSelected"
              item-text="name"
              item-value="name"
              label="Pilih peran"
              single-line
              return-object
              bottom
            ></v-select>
          </v-flex>
          <v-btn primary @click.native="setUserRole">Set Peran</v-btn>
          <v-btn flat @click.native="step = 2">Kembali</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>

  </v-layout>
</template>
<script>
  export default {
    $validates: true,
    data () {
      return {
        step: 0,
        passwordVisibility: true,
        email: '',
        password: '',
        emailDisabled: false,
        passwordDisabled: false,
        userAccount: {},
        fullName: '',
        fullNameDisabled: false,
        phone: '',
        phoneDisabled: false,
        gender: 'men',
        genderDisabled: false,
        identityNumber: '',
        identityNumberDisabled: false,
        address: '',
        addressDisabled: false,
        roleSelected: {},
        rolesItems: []
      }
    },
    mounted() {
      this.fetchRoles()
    },
    methods: {
      createAccountStep () {
        let self = this
        this.$validator.validateAll('form-account').then((result) => {
          if (result) {
            self.axios({
              method: 'post',
              url: self.$store.getters.apiUrl + '/users',
              data: {
                email: self.email,
                password: self.password
              }
            }).then(user => {
              console.log('berhasil buat user : ', user);
              self.userAccount = user.data
              self.emailDisabled = true
              self.passwordDisabled = true
              self.step = 2
            }).catch(err => {
              console.log('gagal buat user : ', err);
            })
            return
          }
        })
      },
      createProfileStep () {
        let self = this
        this.$validator.validateAll('form-profile').then((result) => {
          if (result) {
            self.axios({
              method: 'post',
              url: self.$store.getters.apiUrl + '/Profiles?access_token=' + this.$store.getters.token,
              data: {
                fullName: self.fullName,
                phone: self.phone,
                gender: self.gender,
                identityNumber: self.identityNumber,
                address: self.address,
                userId: self.userAccount.id
              }
            }).then(profile => {
              console.log('berhasil buat profile user : ', self.userAccount, profile);
              self.fullNameDisabled = true
              self.phoneDisabled = true
              self.genderDisabled = true
              self.identityNumberDisabled = true
              self.addressDisabled = true
              self.step = 3
            }).catch(err => {
              console.log('gagal buat profile user : ', err);
            })
            return
          }
        })
      },
      setUserRole () {
        console.log('roleSelected : ', this.roleSelected);
        this.axios({
          method: 'post',
          url: this.$store.getters.apiUrl + '/RoleMappings?access_token=' + this.$store.getters.token,
          data: {
            principalType: 'USER',
            principalId: this.userAccount.id,
            roleId: this.roleSelected.id
          }
        }).then(RoleMappings => {
          console.log('sukses set user role : ', RoleMappings);
          this.$router.push('/dashboard/users')
        }).catch(err => {
          console.log('error saat set user : ', err);
        })
      },
      fetchRoles () {
        this.axios({
          method: 'get',
          url: this.$store.getters.apiUrl + '/Roles/',
        }).then(roles => {
          console.log('fetchRoles sukses : ', roles.data);
          this.rolesItems = roles.data
        }).catch(err => {
          console.log('error when trying to get all roles : ', err);
        })
      }
    }

  }
</script>
