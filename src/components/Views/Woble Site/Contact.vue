<script setup>

</script>

<template>
  <div class="wrapper px-4 sm:px-10">
    <div class="text-1/2xl   font-black">Contact us</div>
    <div class="text-3xl lg:text-4xl font-black mt-7 md:mt-10">Keep in Touch With Us</div>
    <div class="text-1/2xl font-normal mt-1">Let your suggestions or concerns be known – we are here for
      you!
    </div>

    <div class="email flex gap-5 mx-auto items-center bg-white">
      <input type="text" placeholder="Enter your e-mail">
      <button class="light_hover">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 41.315 32.21">
          <g id="Group_325" data-name="Group 325" transform="translate(-240.906 -2559.396)">
            <rect id="Rectangle_103" data-name="Rectangle 103" width="38.368" height="29.263" rx="4.041"
                  transform="translate(242.38 2560.869)" fill="none" stroke="currentColor" stroke-linecap="round"
                  stroke-miterlimit="10" stroke-width="2.947"/>
            <path id="Path_82" data-name="Path 82" d="M244.25,2562.485l17.315,14.995,17.315-14.995" fill="none"
                  stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.947"/>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .email{
    margin-top: 3rem;
    padding: .5rem;
    font-family: inherit;
    border-radius: 100px;

    input{
      background: transparent;
      text-indent: 1.5rem;
      width: 100%;
      font-size: 1.3rem;
      outline: none;
      color: var(--theme-color);
    }
    button{
      height: 50px;
      width: 50px;
      flex-shrink: 0;
      padding: 7px;
      font-size: 1.7rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1000px;
      background: var(--theme-color);
    }
  }
</style>
