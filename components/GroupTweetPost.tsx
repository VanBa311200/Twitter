import { UserInterFace } from '../types/auth';
import { PostDataInterface } from '../types/posts';
import { ItemTweetPost } from './ItemTweetPost';

interface Props {
  posts: PostDataInterface<UserInterFace>[] | null;
}

export const GroupTweetPost = ({ posts }: Props) => {
  return (
    <>
      {!posts?.length ? (
        <div className="text-textMain text-center mt-3">
          You haven&#39;t any Tweet!!!
          <span className="block text-lg">
            ✨Let&#39;s make tweet for yourself.
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
