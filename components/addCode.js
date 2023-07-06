import { useModals } from '@mantine/modals';
import NewAppForm from './newApp';

export default function AddCode({ onSubmit }) {
  const modals = useModals();

  const openNewModal = () => {
    const id = modals.openModal({
      title: 'New Application',
      centered: true,
      children: (
        <NewAppForm
          onSubmit={(c) => {
            modals.closeModal(id);
            onSubmit(c);
          }}
        />
      ),
    });
  };
  return (
    <>
      <div title="Add" className="click adder" onClick={openNewModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 330 330"
          fill="currentColor"
        >
          <path d="M315,120H210V15c0-8.284-6.716-15-15-15h-60c-8.284,0-15,6.716-15,15v105H15c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15h105v105c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15V210h105c8.284,0,15-6.716,15-15v-60C330,126.716,323.284,120,315,120z" />
        </svg>
      </div>
      <style jsx>{`
        .adder {
          display: block;
          border: 1px solid #ccc;
          border-radius: 3px;
          transition: all 0.1s linear;
          margin: 10px;
          text-align: center;
          background-color: #ddd;
          color: #bbb;
          padding: 30px;
        }
        .adder:hover {
          border-color: #111;
        }
        .adder svg {
          display: block;
          height: 20px;
          width: auto;
          margin: auto;
        }
      `}</style>
    </>
  );
}
