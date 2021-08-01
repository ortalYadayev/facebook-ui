<template>
  <div class="bg-gray_rgb min-h-screen flex flex-col justify-center items-center">
    <img class="mb-2 md:mb-8 h-20" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="פייסבוק">
    <form method="post" class="register-form bg-white flex flex-col justify-center rounded-lg px-8 py-10 mb-4">
      <div class="flex flex-col mb-3">
        <label for="firstname" class="mb-1 text-primary text-lg tracking-wide">שם פרטי</label>
        <input id="firstname" name="firstname" placeholder="שם פרטי" type="text"
               class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-3">
        <label for="lastname" class="mb-1 text-primary text-lg tracking-wide">שם משפחה</label>
        <input id="lastname" name="lastname" placeholder="שם משפחה" type="text"
           class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-3">
        <label for="email" class="mb-1 text-primary text-lg tracking-wide">דואר אלקטרוני</label>
        <input id="email" name="email" placeholder="דואר אלקטרוני" type="text"
               class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-3">
        <label for="password" class="mb-1 text-primary text-lg tracking-wide">סיסמה</label>
        <input id="password" name="password" placeholder="סיסמה" type="text"
               class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div class="flex flex-col mb-6">
        <label for="confirm" class="mb-1 text-primary text-lg tracking-wide">אימות סיסמה</label>
        <input id="confirm" name="confirm" placeholder="אימות סיסמה" type="text"
               class="border-2 hover:border-primary focus:border-primary focus:border-opacity-50 border-gray-300 text-gray-300 hover:text-black focus:text-black rounded-md px-3 py-1.5"
        >
      </div>
      <div>
        <button @click="addUser" class="w-full border-2 border-primary bg-primary text-lg text-gray_rgb rounded-3xl py-2 px-10">
          הרשמה
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>


</script>

<style lang="sass" scoped>
@import "../assets/css/app.sass"
</style>