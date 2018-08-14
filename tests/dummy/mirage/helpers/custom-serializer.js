import { Serializer } from 'jsonapi-serializer';

export default (data) => new Serializer('layer-groups', {
  attributes: ['id', 'layers', 'title'],
  layers: {
    ref(parent, child) {
      return child.style.id;
    },
    included: true,
    attributes: ['style', 'before'],
  },
}).serialize(data);
