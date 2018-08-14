import { Serializer } from 'jsonapi-serializer';

export default (data) => new Serializer('layer-groups', {
  attributes: ['id','title','visible','layerVisibilityType','titleTooltip','meta','layers','legendConfig','legendIcon','legendColor'],
  layers: {
    ref(parent, child) {
      return child.style.id;
    },
    included: true,
    attributes: ['style','displayName','before','clickable','highlightable','tooltipable','tooltipTemplate'],
  },
}).serialize(data);
