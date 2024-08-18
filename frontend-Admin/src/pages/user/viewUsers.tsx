import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import TableHOC from "../../components/table/tableHOC";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
  useUpdateStatusMutation,
  userAPI,
} from "../../redux/api/userApi";
import { RootState, server } from "../../redux/store";
import { CustomError } from "../../types/types";

// Importing Icons
import { MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ToogleSwitch from "../../components/switch/toogleSwitch";
import Tooltip from "../../components/tooltip/tooltip";
import { updateLocalUser } from "../../redux/reducers/userReducer";
import { NewUserData, UpdateStatusType } from "../../types/apiTypes";

export interface DataTypeNewUser {
  _id: string;
  name?: string;
  email?: string;
  // avatar?: ReactElement ;
  avatar?: any;
  gender?: string;
  role?:
    | {
        _id: string;
        name: string;
        description: string;
      }
    | string;
  dob?: Date;
  active?: boolean;
  shopNo?:
    | {
        _id?: string;
        shopCode?: string;
        shopAddress: string;
        wareHouseId?: {
          wareHouseCode: string;
          wareHouseAddress: string;
        };
      }
    | string;
  wareHouseId?:
    | {
        shopCode: string;
        shopAddress: string;
        wareHouseId?: {
          wareHouseCode: string;
          wareHouseAddress: string;
        };
      }
    | string;
  printer?: string;
  tableRows?: number;
  posId?: string;
  phoneNo?: string;
  whatsappNo?: string;
  createdAt?: string;
  action: ReactElement;
}

const columns: Column<DataTypeNewUser>[] = [
  {
    Header: "Photo",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  //   {
  //     Header: "Gender",
  //     accessor: "gender",
  //   },
  //   {
  //     Header: "DOB",
  //     accessor: "dob",
  //   },
  {
    Header: "Shop",
    accessor: "shopNo",
  },
  {
    Header: "Warehouse",
    accessor: "wareHouseId",
  },
  //   {
  //     Header: "Printer",
  //     accessor: "printer",
  //   },
  //   {
  //     Header: "TableRows",
  //     accessor: "tableRows",
  //   },
  //   {
  //     Header: "posId",
  //     accessor: "posId",
  //   },
  {
    Header: "phone",
    accessor: "phoneNo",
  },
  {
    Header: "whatsapp",
    accessor: "whatsappNo",
  },
  {
    Header: "CreatedAt",
    accessor: "createdAt",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const ViewUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useAllUsersQuery();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { user: myData } = useSelector((state: RootState) => state.userReducer);
  const [deleteUser] = useDeleteUserMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [rows, setRows] = useState<DataTypeNewUser[]>([]);
  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }

    return () => {
      dispatch(userAPI.util.resetApiState());
    };
  }, []);

  const handleUpdate = (user: DataTypeNewUser) => {
    console.log(user?.avatar);
    const userDataToUpdated: NewUserData = {
      id: user!._id,
      name: user.name!,
      email: user.email!,
      photo: user.avatar!,
      gender: user.gender!,
      role: user.role
        ? typeof user.role !== "string"
          ? user.role._id!.toString()
          : user.role
        : "",
      active: user.active!,
      shopNo: user.shopNo
        ? typeof user.shopNo !== "string"
          ? user.shopNo._id!.toString()
          : user.shopNo
        : "",
      printer: user.printer!,
      tableRows: user.tableRows ? user.tableRows.toString()! : "",
      posId: user.posId!,
      phoneNo: user.phoneNo!,
      whatsappNo: user.whatsappNo!,
      dob: user.dob ? user.dob?.toString() : "",
      pageAddress: "Update User Profile",
    };
    console.log(userDataToUpdated);
    dispatch(updateLocalUser(userDataToUpdated));
    navigate("/manageUserProfile");
  };

  const handleDelete = async (data: any) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await deleteUser(data._id);
        if ("data" in response) {
          Swal.fire("Saved!", "", "success");
        }
        if ("error" in response) {
          if ("data" in response.error) {
            Swal.fire((response.error.data as any).message, "", "error");
          }
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    console.log(data);
  };

  const handleStatus = async ({ active, id }: UpdateStatusType) => {
    console.log(active, id);
    const data = await updateStatus({ active, id });
    console.log(data);
    console.log("status");
  };

  useEffect(() => {
    if (data && myData) {
      console.log(data);
      setRows(
        data.users
          .filter((i) => i._id !== myData?._id)
          .map((i) => ({
            _id: i._id, // Add the _id property
            avatar: (
              <img key={i._id} src={`${server}/${i.avatar.url}`} alt={i.name} />
            ),
            name: i.name,
            email: i.email,
            gender: i.gender,
            dob: i.dob,
            shopNo:
              typeof i.shopNo === "string" ? i.shopNo : i.shopNo?.shopCode,
            wareHouseId:
              typeof i.shopNo === "string"
                ? i.shopNo
                : i.shopNo?.wareHouseId?.wareHouseCode,
            whatsappNo: i.whatsappNo,
            phoneNo: i.phoneNo,
            tableRows: i.tableRows,
            posId: i.posId,
            printer: i.printer,
            createdAt:
              i.createdAt &&
              new Date(i.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            role: typeof i.role === "string" ? i.role : i.role?.name,
            action: (
              <div className="tableActions">
                <Tooltip text="Update" length="small" position="down">
                  <MdOutlineUpdate onClick={() => handleUpdate(i)} />
                </Tooltip>
                <Tooltip text="Delete" length="small" position="down">
                  <MdDeleteOutline onClick={() => handleDelete(i)} />
                </Tooltip>
                <Tooltip text="Status" length="small" position="down">
                  <ToogleSwitch
                    handleChange={() =>
                      handleStatus({
                        id: i._id,
                        active: i.active! && i.active === true ? false : true,
                      })
                    }
                    isChecked={i.active!}
                  />
                </Tooltip>
              </div>
            ),
          }))
      );
    }
  }, [data, myData]);

  const Table = TableHOC<DataTypeNewUser>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  return (
    <Container>
      <section className="userContainer">
        <Heading name="View Users" />
        {isLoading ? <SkeletonLoader length={20} /> : Table}
      </section>
    </Container>
  );
};

export default ViewUsers;
