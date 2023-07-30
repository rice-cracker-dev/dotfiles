<script lang="ts">
  import Icon from '@iconify/svelte';

  export let success: 'failure' | 'success' | 'loading' | boolean = false;
  export let description = '';
</script>

<p
  class="flex items-center gap-2 duration-150 {success === 'success' || success === true
    ? 'text-green-400'
    : success === 'failure' || success == false
    ? 'text-red-400'
    : 'text-orange-400'}"
>
  {#if success === 'success' || success === true}
    <Icon icon="solar:check-circle-bold" />
  {:else}
    <Icon icon="solar:close-circle-bold" />
  {/if}

  <span>{description}</span>
</p>
