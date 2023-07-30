<script lang="ts">
  import { user, userData } from '$lib/firebase';
  import Icon from '@iconify/svelte';
</script>

{#if !$user}
  <a href="/auth/signin" class="btn btn-accent">
    <Icon icon="solar:login-2-linear" />
    <span>Sign in</span>
  </a>
{:else if !$userData}
  <a href="/auth/username" class="btn btn-accent">
    <Icon icon="solar:login-2-linear" />
    <span>Finish setting up your account</span>
  </a>
{:else}
  <a href="/profile" class="btn btn-ghost">
    <div class="flex items-stretch gap-4">
      <img src={$userData.photoURL} alt="avatar" class="h-8 rounded-full" />
      <div class="grid grid-rows-2 items-center justify-start text-left">
        <p>{$userData.username}</p>
        <p class="font-normal text-base-content/75">0 reputation</p>
      </div>
    </div>
  </a>
{/if}
