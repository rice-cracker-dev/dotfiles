<script lang="ts">
  import StateLabel from '$lib/components/StateLabel/index.svelte';
  import { goto } from '$app/navigation';
  import { firestore, user, userData } from '$lib/firebase';
  import { doc, getDoc, writeBatch } from 'firebase/firestore';

  let username = '';
  let isLoading = false;
  let isAvailable = false;

  let debounceTimer: NodeJS.Timeout;

  const checkAvailability = async () => {
    isAvailable = false;
    clearTimeout(debounceTimer);

    isLoading = true;

    debounceTimer = setTimeout(async () => {
      console.log('checking availability of', username);

      if (/^ *$/.test(username)) {
        isLoading = false;
        isAvailable = false;
        return;
      }

      const ref = doc(firestore, 'usernames', username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      isLoading = false;
    }, 500);
  };

  const confirmUsername = async () => {
    if (!isValidUsername) {
      return;
    }

    const batch = writeBatch(firestore);
    batch.set(doc(firestore, 'usernames', username), { uid: $user?.uid });
    batch.set(doc(firestore, 'users', $user!.uid), {
      username,
      displayName: username,
      photoURL: $user?.photoURL ?? null,
      bio: '',
    });

    await batch.commit();

    username = '';
    isAvailable = false;

    goto('/');
  };

  $: mustBetweenLimit = username.length >= 4 && username.length <= 20;
  $: noSpecialCharacter = /^[a-zA-Z0-9_-]*$/.test(username);
  $: isValidUsername = isAvailable && mustBetweenLimit && noSpecialCharacter;
</script>

{#if $userData}
  <p>Your username is already registered!</p>
{:else}
  <form on:submit|preventDefault={confirmUsername} class="flex items-stretch gap-4">
    <input
      bind:value={username}
      on:input={checkAvailability}
      placeholder="Username"
      class="input input-bordered"
      class:input-warning={isLoading}
      class:input-error={(!isAvailable && !isLoading) || !mustBetweenLimit || !noSpecialCharacter}
      class:input-success={isValidUsername}
      required
    />

    <button type="submit" disabled={!isValidUsername} class="btn btn-accent">Submit</button>
  </form>

  <p class="mt-4">Username requirement</p>
  <div class="text-sm text-base-content/50">
    <StateLabel success={mustBetweenLimit} description="Must be between 4 - 20 characters" />
    <StateLabel
      success={noSpecialCharacter}
      description="No special characters (including spaces)"
    />
    <StateLabel success={isLoading ? 'loading' : isAvailable} description="Must be unique" />
  </div>
{/if}
