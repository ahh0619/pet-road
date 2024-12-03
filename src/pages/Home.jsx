import useAuthUserStore from '../stores/authUserStore';

const Home = () => {
  const authUser = useAuthUserStore((state) => state.authUser);
  return (
    <>
      <div>{authUser?.userName}</div>
      <div>Home</div>
    </>
  );
};

export default Home;
