<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Terminal Typer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .blink { animation: blink 1s step-end infinite; }
    @keyframes blink { from, to { border-color: transparent } 50% { border-color: #00ff00 } }
    .correct { color: #22c55e; }
    .incorrect { color: #f43f5e; }
    .untyped { color: #4ade80; opacity: 0.3; }
    .theme-matrix { background-color: #000; color: #00ff00; }
    .theme-retro { background-color: #222; color: #facc15; }
    .theme-blue { background-color: #001f3f; color: #7fdbff; }
  </style>
</head>
<body id="body" class="bg-black text-green-400 font-mono p-8 min-h-screen">
  <div id="startScreen" class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl mb-6">👨‍💻 Terminal Typer</h1>
    <p class="text-center text-gray-400 mb-4">Type real Linux commands. Learn as you go.</p>
    <button onclick="showGame()" class="bg-green-700 px-6 py-3 rounded hover:bg-green-600 text-lg">Start</button>
  </div>

  <div id="gameUI" class="hidden max-w-3xl mx-auto">
    <div class="mb-4 text-center mt-4">
      <label class="mr-2">🎨 Theme:</label>
      <select id="themeSelect" class="bg-gray-800 text-green-300 p-2 rounded">
        <option value="matrix">Matrix Green</option>
        <option value="retro">Retro Yellow</option>
        <option value="blue">Blue Ice</option>
      </select>
    </div>

    <div id="countdown" class="text-center text-2xl font-bold text-red-400 mb-4 hidden"></div>
    <div id="prompt" class="bg-gray-900 p-4 rounded mb-2 whitespace-pre-wrap text-lg"></div>

    <textarea id="input" class="w-full h-40 bg-black text-green-400 border border-green-400 p-2 resize-none focus:outline-none focus:ring-2 ring-green-500 caret-green-400" placeholder="Type here..." autofocus spellcheck="false" disabled></textarea>

    <div class="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <button onclick="prepCountdown()" class="bg-green-700 px-6 py-2 rounded hover:bg-green-600">▶️ Start Typing</button>
      <button onclick="resetGame()" class="bg-red-700 px-6 py-2 rounded hover:bg-red-600">🔁 Reset</button>
      <div id="stats" class="text-sm text-left"></div>
    </div>

    <div class="mt-6">
      <h3 class="font-bold text-lg mb-3 text-green-300 border-b border-green-700 pb-1">🧠 Command Breakdown</h3>
      <div id="blurb" class="bg-gray-800 border border-green-500 p-4 rounded-md shadow-inner">
        <ul id="blurbList" class="space-y-2 text-green-200"></ul>
      </div>
    </div>

    <div class="mt-4">
      <h3 class="font-bold text-lg mb-2 text-green-300 border-b border-green-700 pb-1">🧪 Example Use Cases</h3>
      <div id="useCases" class="bg-gray-800 border border-green-500 p-4 rounded-md shadow-inner text-green-200 text-sm space-y-2"></div>
    </div>

    <div class="mt-6">
      <h2 class="text-xl mb-2">📜 Typing History</h2>
      <ul id="history" class="space-y-2 max-h-40 overflow-y-auto text-sm"></ul>
    </div>
  </div>

  <script src="main.js"></script>
</body>
</html>
