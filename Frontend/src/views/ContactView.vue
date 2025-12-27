<script setup>
import UserLayout from '@/components/User/UserLayout.vue';

</script>

<template>
  <UserLayout>
    <div class="w-450 mx-auto">
      <div class="flex flex-row ml-10 mt-10">
        <p class="text-gray-500">Home /</p>
        <p class="text-black">Contact</p>
      </div>

      <div class="flex ml-15 mb-30 mt-5 gap-10">
        <div class="w-1/3 flex flex-col border border-gray-300 shadow-xl p-15">
          <div class="flex flex-row">
            <img src="@/assets/User/icons-phone.png" alt="">
            <p class="text-2xl ml-10">Call To Us</p>
          </div>
          <p class="text-xl mt-10">We are available 24/7, 7 days a week</p>
          <p class="text-xl mt-10">Phone +88001611122</p>
          <div class="border-b-1 mt-15 px-20"></div>
          <div class="flex flex-row">
            <img src="@/assets/User/mail.png" alt="" class="w-10 h-10 mt-9">
            <p class="text-2xl mt-10 ml-10">Write To Us</p>
          </div>
          <p class="text-xl mt-10">Fill out our form and we will contact you within 24 hours.</p>
          <p class="text-xl mt-10">Email : customer@support.com</p>
          <p class="text-xl mt-10">Email : customer@support.com</p>
        </div>

        <div class="w-full flex flex-col border border-gray-300 shadow-xl">
          <div class="w-full flex flex-row">
            <div class="w-1/3">
              <label class="input validator ml-15 mt-10">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                    stroke="currentColor">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input class="text-xl" type="text" required placeholder="Your name" pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3" maxlength="30" title="Only letters, numbers or dash" />
              </label>
              <p class="validator-hint">
                Must be 3 to 30 characters
                <br />containing only letters, numbers or dash
              </p>
            </div>
            <div class="w-1/3">
              <label class="input validator ml-15 mt-10">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                    stroke="currentColor">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input class="text-xl" type="text" required placeholder="Email" pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3" maxlength="30" title="Only letters, numbers or dash" />
              </label>
              <p class="validator-hint">
                Must be 3 to 30 characters
                <br />containing only letters, numbers or dash
              </p>
            </div>
            <div class="w-1/3">
              <label class="input validator ml-15 mt-10">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                    stroke="currentColor">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input class="text-xl" type="text" required placeholder="Phone" pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3" maxlength="30" title="Only letters, numbers or dash" />
              </label>
              <p class="validator-hint">
                Must be 3 to 30 characters
                <br />containing only letters, numbers or dash
              </p>
            </div>
          </div>

          <div class="w-full p-10 h-full flex flex-col">
            <textarea class="textarea w-full text-xl !h-100" placeholder="Message"></textarea>
            <button class="btn btn-active btn-warning w-50 text-xl h-15 mt-10 ml-270 text-blacks">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
