<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex h-[100svh] items-center justify-center">
  <div class="flex flex-col items-center p-4">
    <p class="font-bold">{$page.status}</p>
    {$page.error?.message}
  </div>
</div>
