<template>
  <div class="flex flex-col items-center">
    <div class="w-full md:w-[700px] lg:w-[1000px]">
      <div class="flex flex-col">
        <h1 class="font-bold text-6xl text-white text-left">Bienvenido</h1>
        <div class="flex justify-between w-full">
          <div class="w-[600px] h-[300px] flex justify-center items-center">
            <img src="/public/images/gerar2.webp" width="200" alt="" />
          </div>
          <h3 class="font-normal my-4 text-right pt-24">
            Aquí podrás hablar con el <span class="text-yellow-400">Gran Ñacañaca</span>, dios de
            los números, integrador de lo real y de lo imaginario. Quizas..
            <span class="text-yellow-400"
              >podrias recibir su bendición para tu próxima prueba.</span
            >
            <button
              @click="inputUserData()"
              class="float-right text-purple-500 py-2 px-4 mt-8 border-2 border-purple-400 hover:border-yellow-400 transition-all font-semibold rounded-md hover:text-yellow-400 hover:scale-105"
            >
              Rogar a Ñacañaca ==>
            </button>
          </h3>
        </div>
      </div>
      <div>
        <h1 class="text-left text-green-400 font-semibold mb-10">
          Bendecidos por <span class="text-yellow-400">Gran Ñacañaca</span>
        </h1>

        <table class="w-full text-center">
          <thead class="border-2 border-[#ffffff0f] [&>tr>th]:py-4">
            <tr class="rounded-xl">
              <th>Nombre</th>
              <th>Año de carrera</th>
              <th>Número de intentos</th>
            </tr>
          </thead>
          <tbody class="border-2 border-[#ffffff0f] [&>tr>td]:py-4">
            <tr v-for="bendecido in bendecidos" :key="bendecido.id">
              <td>{{ bendecido.name }}</td>
              <td>{{ bendecido.year }}°</td>
              <td>{{ bendecido.times }}</td>
            </tr>

            <!-- Agrega más filas según sea necesario -->
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="userInput"
      class="top-1/2 -translate-y-1/2 w-[90%] md:w-[500px] h-[450px] absolute bg-[#262626] rounded-md p-5"
    >
      <div>
        <img
          src="/public/images/close.jpg"
          @click="userInput = !userInput"
          width="40"
          class="absolute right-5 rounded-md cursor-pointer"
          alt=""
        />
      </div>
      <p class="mt-[60px] italic font-normal mb-2">
        La bendición de Ñacañaca será efectiva solo en aquellos con un corazón sincero, llena los
        siguientes datos para ser bendecido:
      </p>
      <div class="">
        <h4 class="font-bold">Tu nombre es:</h4>
        <input
          v-model="name"
          type="text"
          class="bg-[#ffffff0f] w-full h-12 my-5 mt-2 rounded-md px-4"
        />

        <h4 class="font-bold">Tu año universitario (ej: 1, 2, 3,...)</h4>
        <input
          v-model="year"
          type="text"
          class="bg-[#ffffff0f] w-full h-12 my-5 mt-2 rounded-md px-4"
        />
        <p class="text-red-500" v-if="errorCamposVacios">Rellena los campos anteriores</p>
        <div class="absolute bottom-5 right-5">
          <button
            @click="rogar()"
            class="bg-[#ffffff03] float-right text-purple-500 border-purple-800 border-2 py-2 px-4 mt-2 font-semibold rounded-md hover:scale-105 hover:text-yellow-400 hover:border-yellow-400 transition-all"
          >
            Rogar a Gran Ñacañaca
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import { useCounterStore } from '../stores/store'
import router from '../router'
//const store = useCounterStore()

export default {
  data() {
    return {
      name: '',
      year: '',
      bendecidos: [],
      userInput: false,
      errorCamposVacios: false
    }
  },
  methods: {
    compare(x, y) {
      if (x.times > y.times) {
        return 1
      }
      if (x.times < y.times) {
        return -1
      }
      return 0
    },
    rogar() {
      if (this.name == '' || this.year == '') {
        this.errorCamposVacios = true
        setTimeout(() => {
          this.errorCamposVacios = false
        }, 5000)
      } else {
        /*      store.name = this.name
        store.year = this.year
        store.blessed = false
        store.times = 0 */
        router.push({ path: 'talk', query: { name: this.name, year: this.year } })
      }
    },
    inputUserData() {
      this.userInput = !this.userInput
    },
    async loadData() {
      const options = { method: 'GET', url: 'http://127.0.0.1:5050/bendecidos' }
      await axios
        .request(options)
        .then((response) => {
          console.log(response.data)
          this.bendecidos = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  async created() {
    await this.loadData()
    this.bendecidos.sort(this.compare)
  }
}
</script>

<style lang="scss" scoped></style>
../stores/store
