import { PostDataInterface } from '../types/posts';
import { ItemTweetPost } from './ItemTweetPost';

interface Props {
  posts?: [PostDataInterface];
}

export const GroupTweetPost = ({ posts }: Props) => {
  return (
    <>
      {!posts ? (
        <div className="text-textMain text-center">Loading...</div>
      ) : (
        <>
          {posts?.map((post) => (
            <ItemTweetPost post={post} key={post?.id} />
          ))}
        </>
      )}
    </>
  );
};
