/* ::::::::::::::::::::::::::::::: Variaveis :::::::::::::::::::::::::: */

let img = document.querySelector(".imgMusic");
let name_music = document.querySelector(".nomeMusic");

let tempoIn = document.querySelector(".tempoInicial");
let tempoFi = document.querySelector(".tempoFinal");
let barraTem = document.querySelector("#barraT");

let barraVo = document.querySelector("#barraV");

let musica = document.querySelector("audio");

let prev_btn = document.querySelector("#prev_btn");
let next_btn = document.querySelector("#next_btn");
let playpause_btn = document.querySelector("#playpause_btn");

let isPlaying = false;
let music_index = 5;

/* ::::::::::::::::::::::::::::::: Lista de musicas :::::::::::::::::::::::::: */

let music_list = [
  {
    name: "Naruto Ending 1",
    music: "audio/Naruto Ending 1.mp3",
    image: "img/seloNaruto.jpg",
  },
  {
    name: "Naruto Shippuden Opening 1",
    music: "audio/Naruto Shippuden Opening 1.mp3",
    image: "img/areia.jpg",
  },
  {
    name: "Naruto Shippuden Opening 2",
    music: "audio/Naruto Shippuden Opening 2.mp3",
    image: "img/akatsuki.jpg",
  },
  {
    name: "Naruto Shippuden Opening 3",
    music: "audio/Naruto Shippuden Opening 3.mp3",
    image: "img/bird.png",
  },
  {
    name: "Naruto Shippuden Opening 4",
    music: "audio/Naruto Shippuden Opening 4.mp3",
    image: "img/nevoa.jpg",
  },
  {
    name: "Naruto Shippuden Opening 13",
    music: "audio/Naruto Shippuden Opening 13.mp3",
    image: "img/op13.gif",
  },
];

load_Music(music_list[music_index]);

/* ::::::::::::::::::::::::::::::: Funcoes :::::::::::::::::::::::::: */

/* Seleciona a musica e detalhes na lista */

function load_Music(song) {
  name_music.innerHTML = song.name;
  musica.src = song.music;
  img.src = song.image;
}

/* Funcao de iniciar a musica */

function music_play() {
  isPlaying = true;

  playpause_btn.innerHTML = `<i id="playpause_btn" class='material-icons'>&#xe1a2</1> `;

  img.style = "animation-play-state:running";
  musica.play();
}

/* Funcao de parar a musica */

function music_pause() {
  isPlaying = false;

  playpause_btn.innerHTML =
    '<i class="material-icons" id="playpause_btn">&#xe039</i>';

  img.style = "animation-play-state:paused";
  musica.pause();
}

/* Funcao de formatar os minutos e segundos */

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  if (min < 10) {
    min = `0${min}`;
  }

  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min}:${sec} `;
}

/* ::::::::::::::::::::::::::::::: Barras de progresso :::::::::::::::::::::::::: */

/* Funcao de progresso de tempo */

barraTem.addEventListener("click", (e) => {
  musica.currentTime = (e.offsetX / barraTem.offsetWidth) * musica.duration;
});

/* Volume da música */

barraVo.addEventListener("change", (e) => {
  musica.volume = e.currentTarget.value / 100;
});

/* ::::::::::::::::::::::::::::::: Botoes :::::::::::::::::::::::::: */

/* Atualiza musica */

musica.addEventListener("timeupdate", () => {
  barraTem.value = Math.floor((musica.currentTime / musica.duration) * 100);

  tempoIn.innerHTML = formatTime(Math.floor(musica.currentTime));
  tempoFi.innerHTML = formatTime(Math.floor(musica.duration));

  if (musica.currentTime === musica.duration) {
    music_pause();
  }
});

/* Iniciar e parar a musica */

playpause_btn.addEventListener("click", () => {
  if (isPlaying == false) {
    music_play();
  } else {
    music_pause();
  }
});

/* Voltar musica */

prev_btn.addEventListener("click", () => {
  music_index--;

  if (music_index < 0) {
    music_index = music_list.length - 1;
  }

  load_Music(music_list[music_index]);
  music_play();
});

/* Proxima musica */

next_btn.addEventListener("click", () => {
  music_index++;

  if (music_index > music_list.length - 1) {
    music_index = 0;
  }

  load_Music(music_list[music_index]);
  music_play();
});
