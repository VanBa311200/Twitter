import { UserInterFace } from '../types/auth';
import { PostDataInterface } from '../types/posts';
import { ItemTweetPost } from './ItemTweetPost';

interface Props {
  posts?: [PostDataInterface<UserInterFace>];
}

export const GroupTweetPost = ({ posts }: Props) => {
  return (
    <>
      {!posts?.length ? (
        <div className="text-textMain text-center mt-3">
          🤷‍♂️You haven't any Tweet!!! <br />{' '}
          <span className="block text-lg">
            ✨Let's make tweet for yourself.
          </span>
        </div>
      ) : (
        <>
          {posts?.map((post) => (
            <ItemTweetPost post={post} key={post?._id} />
          ))}
        </>
      )}
    </>
  );
};
