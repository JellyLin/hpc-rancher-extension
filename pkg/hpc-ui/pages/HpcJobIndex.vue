<script>
import ResourceList from '@shell/components/ResourceList';

export default {
  name:       'ClusterResourcedList',
  components: { ResourceList },
};
</script>

<template>
  <div>
    <h1>Volcano Jobs</h1>
    <ResourceList
      :has-advanced-filtering="true"
      :adv-filter-hide-labels-as-cols="true"
      :adv-filter-prevent-filtering-labels="true"
    ></ResourceList>
  </div>
</template>
