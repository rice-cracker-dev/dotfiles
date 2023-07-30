<script lang="ts">
  import { user, userData } from '$lib/firebase';
  import Navbar from '$lib/components/Navbar/index.svelte';

  import '@fontsource-variable/inter';
  import '$/app.css';

  $user;
  $userData;
</script>

<Navbar />

<slot />
