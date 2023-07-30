<script lang="ts">
  import { goto } from '$app/navigation';
  import { providers, signInWithProvider, user, userData } from '$lib/firebase';
  import Icon from '@iconify/svelte';
  import AuthProtected from '$lib/components/AuthProtected/index.svelte';
</script>

{#if !$user}
  <div class="flex flex-col items-stretch gap-4">
    {#each providers as provider}
      <button on:click={() => signInWithProvider(provider.provider)} class="btn btn-neutral">
        <Icon icon={provider.icon} />
        <span>Sign in with {provider.title}</span>
      </button>
    {/each}
  </div>
{:else if !$userData}
  <a href="/auth/username" class="btn btn-accent">Set up username</a>
{:else}
  <p>You have already logged in</p>
{/if}
