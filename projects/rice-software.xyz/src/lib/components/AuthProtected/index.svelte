<script lang="ts">
  import { user, signOut } from '$lib/firebase';

  export let authenticated = true;
</script>

{#if ($user && authenticated) || (!$user && !authenticated)}
  <slot />
{:else}
  <div class="flex h-[100svh] items-center justify-center">
    <div>
      {#if authenticated}
        <p>
          You need to <a href="/auth/signin" class="link-accent link">sign in</a> to view this page!
        </p>
      {:else}
        <p>
          You are already signed in! <button on:click={signOut} class="link-accent link"
            >Sign out</button
          >?
        </p>
      {/if}
    </div>
  </div>
{/if}
