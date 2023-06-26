<template>
  <div class="flex w-full flex-col justify-center items-center">
    <div class="md:w-[700px] lg:w-[1000px]">
      <div class="flex justify-center items-center">
        <img src="/public/images/gerar2.webp" width="200" alt="Squid image" class="" />
      </div>
      <div class="flex justify-center my-4 flex-wrap">
        <h2>Soy el</h2>
        <p class="text-yellow-400 font-bold mx-2 text-center">Gran Ñacañaca!!!,</p>
        <p class="text-center">dios del Análisis Matemático</p>
      </div>
      <p v-if="firstMessage">
        {{ message }}
      </p>
      <p v-if="!firstMessage" class="font-semibold">Gran Ñacañaca responde:</p>
      <p class="text-green-500" v-if="aproved">{{ message }}</p>
      <p class="text-red-600" v-if="aproved == false">
        {{ message }}
      </p>

      <p v-if="!firstMessage" class="font-semibold">Tu pregunta:</p>
      <p v-if="!firstMessage">{{ pregunta }}</p>
      <h4 class="font-semibold mt-4">Responder a Gran Ñacañaca:</h4>

      <div
        v-for="pregunta in selectedPreguntas"
        :key="pregunta.id"
        @click="select(pregunta.id)"
        class="bg-[#ffffff0f] w-full my-2 rounded-md flex items-center p-2 hover:scale-105 transition-transform cursor-pointer"
      >
        {{ pregunta.pregunta }}
      </div>
      <div>
        <button
          @click="seleccionarTresPreguntas"
          class="float-right text-purple-500 py-2 px-4 mt-2 font-semibold rounded-md hover:text-yellow-400 hover:scale-105 transition-transform"
        >
          Otras respuestas ==>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'

const backend = import.meta.env.VITE_BACK_URL
export default {
  data: () => {
    return {
      counter: 0,
      user: 'freddy',
      wasAprove: false,
      pass: '',
      preguntas: [
        {
          id: 1,
          pregunta:
            '¡Oh, Gran Ñacañaca, señor de las fórmulas y los números, por favor no me hagas sufrir otra vez!',
          respuesta:
            '¿Quién dijo que el aprendizaje era fácil? Si quieres un aprobado, tendrás que trabajar duro. Pero si me invitas a una pizza, quizás pueda ser más compasivo.',
          selected: false,
          aprove: false
        },
        {
          id: 2,
          pregunta:
            'Si me apruebas, prometo no volver a decir que las matemáticas son un invento derdiablo para torturarnos. ',
          respuesta:
            'Eso es un alivio, porque no te imaginas cuántos estudiantes han tratado de exorcizar mis ecuaciones. Si te apruebo, prométeme que no volverás a culpar a Satanás por tus malas notas.',
          selected: false,
          aprove: true
        },
        {
          id: 3,
          pregunta:
            '¿Sabes lo que le dijo una ecuación a otra? "No me integres". ¡Así que por favor, intégrame en tus buenos libros y apruébame!',
          respuesta:
            'Eso fue divertido, pero no te garantizo un aprobado solo por un buen chiste matemático. Si quieres mi aprobación, tendrás que demostrar tus habilidades en el examen.',
          selected: false,
          aprove: false
        },
        {
          id: 4,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que los matemáticos son unos seres sin sentimientos... bueno, tal vez solo cuando me pregunten por la definición de "indiferente"',
          respuesta:
            '¡Hey! Los matemáticos también tenemos sentimientos, solo que los expresamos en forma de ecuaciones. Si quieres que tus sentimientos por las matemáticas sean reciprocos, tendrás que demostrar tu comprensión de los conceptos.',
          selected: false,
          aprove: false
        },
        {
          id: 5,
          pregunta:
            '¿Qué es lo que tienen en común los matemáticos y los vampiros? ¡Que ambos prefieren trabajar de noche! Así que por favor, apruébame y déjame dormir tranquilo.',
          respuesta:
            'No puedo garantizarte una noche tranquila si no cumples con los requisitos académicos. Pero si me traes un café, quizás pueda estar más dispuesto a discutir los temas del examen contigo.',
          selected: false,
          aprove: false
        },
        {
          id: 6,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que las matemáticas son más complicadas que entender a las mujeres... bueno, tal vez solo cuando me pregunten por qué no tengo novia.',
          respuesta:
            'Eso es un estereotipo injusto sobre las matemáticas y las mujeres. Pero si te esfuerzas en la asignatura, es posible que puedas demostrar tu inteligencia a una posible pareja. ¡Así que a estudiar se ha dicho!',
          selected: false,
          aprove: false
        },
        {
          id: 7,
          pregunta:
            '¿Te gustaría un chiste de álgebra a cambio de un aprobado? ¿Qué es un polinomio? ¡Es un monomio con problemas de personalidad múltiple!',
          respuesta:
            'Ese chiste tiene una personalidad divertida. Quizás te apruebe, aunque primero tendrás que demostrar tu comprensión de los polinomios en el examen.',
          selected: false,
          aprove: true
        },
        {
          id: 8,
          pregunta:
            'Si me apruebas, te invito a una cena en un restaurante de lujo. (Bueno, quizás solo a una cena en el comedor, pero con la misma ilusión).',
          respuesta:
            'Eso suena tentador, pero no puedo comprometerme a un intercambio de favores académicos por comidas. Si bien es posible que pueda disfrutar de una hamburguesa, no puedo concederle un aprobado solo por un favor.',
          selected: false,
          aprove: false
        },
        {
          id: 9,
          pregunta:
            '¿Sabes por qué los matemáticos siempre están fríos? Porque siempre están en busca de la solución más óptima. ¡Así que por favor, dame la solución óptima para aprobar y te prometo que la aplicaré! ',
          respuesta:
            'Eso es ingenioso, pero no hay una solución mágica para aprobar. Tienes que estudiar y practicar para comprender los conceptos. Si trabajas duro, estoy seguro de que encontrarás la solución óptima por ti mismo.',
          selected: false,
          aprove: false
        },
        {
          id: 10,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que los matemáticos son unos obsesivos del control... bueno, tal vez solo cuando mepregunten por qué reviso mis cuentas de Instagram cada 5 minutos.',
          respuesta:
            'No somos obsesivos del control, solo somos detallistas. Si quieres mi aprobación, tendrás que demostrar tu capacidad para detallar y resolver problemas matemáticos. ¡A trabajar!',
          selected: false,
          aprove: false
        },
        {
          id: 11,
          pregunta:
            '¿Qué es lo que le dijo un triángulo a otro? "¡Eres muy agudo!" ¡Así que por favor, no seas tan agudo conmigo y apruébame!',
          respuesta:
            'Eso es gracioso, pero la agudeza es una habilidad importante en las matemáticas. Si quieres mi aprobación, tendrás que ser agudo y demostrar tu comprensión de los conceptos.',
          selected: false,
          aprove: false
        },
        {
          id: 12,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que los matemáticos no entienden de amor... bueno, tal vez solo cuando me pregunten por qué mi crush me rechazó.',
          respuesta:
            'Los matemáticos también entienden el amor, solo que lo expresamos en forma de ecuaciones. Si quieres mi aprobación, tendrás que demostrar tu capacidad para resolver problemas matemáticos, no para resolver problemas de corazón.',
          selected: false,
          aprove: false
        },
        {
          id: 13,
          pregunta:
            '¿Te gusta el fútbol? Si me apruebas, te prometo que te enseñaré a calcular las posibilidades de que tu equipo gane el próximo partido. (O al menos, te enseñaré a gritar "¡gol!" con entusiasmo).',
          respuesta:
            'Me encanta el fútbol, pero eso no garantiza tu aprobación. Si quieres mi aprobación, tendrás que demostrar tu habilidad para calcular las posibilidades matemáticas en el examen.',
          selected: false,
          aprove: false
        },
        {
          id: 14,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que las matemáticas son más aburridas que ver pintar una pared... bueno, tal vez solo cuando me pregunten por qué me quedé dormido en clase.',
          respuesta:
            'Las matemáticas no son aburridas, solo son desafiantes. Si quieres mi aprobación, tendrás que demostrar tu capacidad para superar esos desafíos y comprender los conceptos.',
          selected: false,
          aprove: false
        },
        {
          id: 15,
          pregunta:
            '¿Qué es lo que le dijo una recta a una curva? "Eres tan retorcida". ¡Así que por favor, no seas tan retorcido conmigo y apruébame!',
          respuesta:
            'Esa es una buena broma, pero no puedo comprometer mi integridad académica por una broma. Si quieres mi aprobación, tendrás que demostrar tu comprensión del material en el examen.',
          selected: false,
          aprove: false
        },
        {
          id: 16,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que los matemáticos son unos seres sin vida social... bueno, tal vez solo cuando me pregunten por qué me quedé en casa estudiando en lugar de salir con mis amigos. ',
          respuesta:
            'Los matemáticos también tienen vida social, solo que preferimos discutir sobre ecuaciones en lugar de festejar. Si quieres mi aprobación, tendrás que demostrar tu capacidad para equilibrar tus estudios y tu vida social.',
          selected: false,
          aprove: false
        },
        {
          id: 17,
          pregunta:
            '¿Te gustaría un chiste de geometría a cambio de un aprobado? ¿Por qué la circunferencia es la más importante de todas las figuras geométricas? ¡Porque es la que tiene más redondeces!',
          respuesta:
            'Ese chiste es ingenioso, pero no puedo conceder un aprobado por un chiste. Si quieres mi aprobación, tendrás que demostrar tu comprensión de los conceptos en el examen.',
          selected: false,
          aprove: false
        },
        {
          id: 18,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que las matemáticas son más complicadas que entender a los políticos... bueno, tal vez solo cuando me pregunten por qué voté por el candidato equivocado.',
          respuesta:
            'Las matemáticas no son más complicadas que los políticos, solo son diferentes. Si quieres mi aprobación, tendrás que demostrar tu capacidad para comprender y aplicar los conceptos matemáticos en el examen.',
          selected: false,
          aprove: false
        },
        {
          id: 19,
          pregunta:
            '¿Te gustaría un juego de palabras matemáticas a cambio de un aprobado? ¿Qué es lo que le dijo un número negativo a otro número negativo? ¡No me restes importancia!" ¡Así que por favor, no me restes importancia y apruébame! ',
          respuesta:
            'Ese juego de palabras es inteligente, ajajaja. te daré mi bendición, pero tendrás que demostrar tu comprensión de los conceptos matemáticos en el examen.',
          selected: false,
          aprove: true
        },
        {
          id: 20,
          pregunta:
            'Si me apruebas, te prometo que no volveré a decir que los matemáticos son unos seres sin emoción... bueno, tal vez solo cuando me pregunten por qué no lloré cuando aprobé el examen.',
          respuesta:
            'Los matemáticos también tenemos emociones, solo que las expresamos de manera diferente. Si quieres mi aprobación, tendrás que demostrar tu comprensión de los conceptos matemáticos y demostrar que estás emocionado por aprender.',
          selected: false,
          aprove: false
        }
      ],
      firstMessage: true,
      aproved: null,
      pregunta: '',
      message: `Solamente evangelios vivos podrán aprobar mi asignatura. Aquellos que se esfuercen y demuestren su compromiso con el aprendizaje podrán apreciar la belleza de las matemáticas. Si estás aquí solo por obligación, tendrás que esforzarte mucho más para demostrar tu dignidad. Yo estaré aquí para guiarlos en su camino hacia la comprensión de las matemáticas. Háblame y quizás te de mi bendición para tu próxima prueba ¿Cual es el motivo de tu visita?`,
      selectedPreguntas: [],
      numeros: []
    }
  },

  methods: {
    select(id) {
      this.counter++
      this.aproved = this.preguntas[id - 1].aprove
      if (this.aproved && !this.wasAprove) {
        this.wasAprove = true
        const options = {
          method: 'POST',
          url: 'http://127.0.0.1:5050/bendecidos',
          headers: { 'Content-Type': 'application/json' },
          data: {
            name: this.$route.query.name,
            year: this.$route.query.year,
            blessed: true,
            times: this.counter
          }
        }
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
            console.error(error)
          })
      }
      this.pregunta = this.preguntas[id - 1].pregunta
      this.message = this.preguntas[id - 1].respuesta
      this.firstMessage = false
    },
    seleccionarTresPreguntas() {
      this.numeros = []
      this.selectedPreguntas = []
      while (this.numeros.length < 3) {
        let numAleatorio = Math.floor(Math.random() * 20) + 1
        console.log(this.numeros)
        console.log(numAleatorio)
        if (!this.numeros.includes(numAleatorio)) {
          this.numeros.push(numAleatorio)
          this.selectedPreguntas.push(this.preguntas[numAleatorio - 1])
        }
      }
      return
    }
  },
  created() {
    let name = this.$route.query.name
    let year = this.$route.query.year
    if (!name || !year) {
      router.push('/')
    }

    this.seleccionarTresPreguntas()
    console.log(backend)
    console.log(this.numeros)
  }
}
</script>

<style scoped></style>
