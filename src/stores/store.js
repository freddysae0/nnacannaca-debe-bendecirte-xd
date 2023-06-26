import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  var name = ref('')
  var year = ref('')
  var times = ref(0)
  var blessed = ref(false)

  function setName(nombre) {
    name.value = nombre
  }
  function setYear(ano) {
    year.value = ano
  }
  function setTimes(veces) {
    times.value = veces
  }
  function setBlessed(bendecidos) {
    blessed.value = bendecidos
  }
  return { name, year, times, blessed, setBlessed, setName, setTimes, setYear }
})

/*
import { defineStore } from 'pinia'

export const useStore = defineStore('bendecidos', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically

      name: '',
      year: '',
      times: 0,
      blessed: false
    }
  }
})*/
