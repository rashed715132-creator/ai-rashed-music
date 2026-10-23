
/* AI Rashed Music - App Controller */

(() => {
  "use strict";

  const state = {
    songs: [],
    currentType: "audio"
  };

  const $ = (id) => document.getElementById(id);

  function showSongs(type) {
    state.currentType = type;

    const heading = $("sectionTitle");
    if (heading) {
      heading.textContent =
        type === "audio" ? "🎵 অডিও গান" : "🎬 ভিডিও গান";
    }

    renderSongs();
  }

  function addSong() {
    const title = $("songTitle")?.value.trim();
    const file = $("songFile")?.files?.[0];
    const type = $("songType")?.value;
    const status = $("status");

    if (!title || !file) {
      if (status) status.textContent = "গানের নাম ও ফাইল নির্বাচন করুন।";
      return;
    }

    if (type === "audio" && !file.type.startsWith("audio/")) {
      if (status) status.textContent = "একটি অডিও ফাইল নির্বাচন করুন।";
      return;
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      if (status) status.textContent = "একটি ভিডিও ফাইল নির্বাচন করুন।";
      return;
    }

    const url = URL.createObjectURL(file);

    state.songs.push({
      id: Date.now() + Math.random(),
      title,
      type,
      url
    });

    $("songTitle").value = "";
    $("songFile").value = "";

    if (status) {
      status.textContent =
        "গান যোগ হয়েছে। এটি আপাতত এই ব্রাউজার সেশনে থাকবে।";
    }

    showSongs(type);
  }

  function renderSongs() {
    const container = $("songs");
    if (!container) return;

    const query = ($("search")?.value || "").toLowerCase();

    const filtered = state.songs.filter((song) =>
      song.type === state.currentType &&
      song.title.toLowerCase().includes(query)
    );

    container.replaceChildren();

    if (filtered.length === 0) {
      const message = document.createElement("p");
      message.className = "empty";
      message.textContent = "এখানে এখনো কোনো গান যোগ করা হয়নি।";
      container.appendChild(message);
      return;
    }

    filtered.forEach((song) => {
      const card = document.createElement("article");
      card.className = "song";

      const title = document.createElement("h3");
      title.textContent = song.title;
      card.appendChild(title);

      const player = document.createElement(
        song.type === "audio" ? "audio" : "video"
      );

      player.src = song.url;
      player.controls = true;
      player.preload = "metadata";

      if (song.type === "video") {
        player.playsInline = true;
      }

      card.appendChild(player);
      container.appendChild(card);
    });
  }

  window.showSongs = showSongs;
  window.addSong = addSong;
  window.renderSongs = renderSongs;
})();
