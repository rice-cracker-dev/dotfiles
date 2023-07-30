<script lang="ts">
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import User from './user.svelte';

  let scrollY: number;
  let isMobileNavbarOpened = false;
</script>

<svelte:window bind:scrollY />

{#if !$page.error}
  <div
    class="pointer-events-none fixed bottom-0 left-0 right-0 top-0 flex flex-col items-stretch border-b-[1px]
    {scrollY > 0 && !isMobileNavbarOpened
      ? 'border-base-content/20 backdrop-blur-lg'
      : 'border-transparent'}"
  >
    <div
      class="flex items-center overflow-hidden {scrollY > 0
        ? 'bg-black/10'
        : 'bg-transparent'} pointer-events-auto p-4"
    >
      <div class="flex flex-1 items-center">
        <button
          class="btn btn-ghost md:hidden"
          on:click={() => (isMobileNavbarOpened = !isMobileNavbarOpened)}
        >
          <Icon icon="solar:hamburger-menu-linear" height="1.5rem" />
        </button>
        <p class="text-lg font-semibold">Rice Software</p>
      </div>

      <div class="hidden md:flex">
        <div class="hidden gap-4 md:flex">
          <a href="/" class="btn btn-ghost justify-start gap-4">
            <Icon icon="fa6-solid:house" />
            <span>Home</span>
          </a>
          <a href="/threads" class="btn btn-ghost justify-start gap-4">
            <Icon icon="solar:chat-line-bold" />
            <span>Threads</span>
          </a>

          <User />
        </div>
      </div>
    </div>

    {#if isMobileNavbarOpened}
      <div
        transition:fly={{ y: '-16px', duration: 150 }}
        class="flex flex-1 flex-col items-stretch gap-4 bg-base-100 p-4"
      >
        <div class="flex flex-col items-stretch gap-4">
          <a href="/" class="btn btn-ghost justify-start gap-4">
            <Icon icon="fa6-solid:house" />
            <span>Home</span>
          </a>
          <a href="/threads" class="btn btn-ghost justify-start gap-4">
            <Icon icon="solar:chat-line-bold" />
            <span>Threads</span>
          </a>
        </div>

        <div class="mt-auto flex flex-col items-stretch">
          <div class="divider">Account</div>

          <User />
        </div>
      </div>
    {/if}
  </div>
{/if}
