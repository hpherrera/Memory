import _ from 'lodash';

export const getRandomImages = (images: any[]) => {
  const shuffled = _.shuffle(images);
  return _.slice(shuffled, 0, 9);
};