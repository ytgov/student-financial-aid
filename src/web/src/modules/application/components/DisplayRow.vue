<template>
  <tr>
    <th>{{ label }}</th>
    <td v-html="value"></td>
  </tr>
</template>

<script lang="ts">
export default { name: "DisplayRow", props: ["label", "value"] };
</script>
