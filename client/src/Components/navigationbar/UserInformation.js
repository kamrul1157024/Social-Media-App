import Username from "../UserName/Username";

/*Should Be Fixed later This is hack solution Replacing 
firstName to userName and lastName to ''  so that navbar 
will show only userName*/

const UserInformation = ({ user }) => {
  const dim = "25px";
  return (
    <>
      <Username
        user={{ ...user, ["firstName"]: user.userName, ["lastName"]: "" }}
        fontSize="16px"
      />
    </>
  );
};

UserInformation.propTypes = {};

export default UserInformation;
