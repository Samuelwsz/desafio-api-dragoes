import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react"
import axios from "axios"
import Home from "./page"
import DragonsPage from "./dragon/page"
import CreateDragon from "./dragon/createdragon/page"
import { Card } from "@/components/card"
import Dragon from "./dragon/[id]/page"

//home
describe("Home Page", () => {
  it("should render the main content with correct text", () => {
    render(<Home />)
    const mainElement = screen.getByText("Dragon API consumption")
    expect(mainElement).toBeInTheDocument()
  })
})

//listadragons
// Mock de resposta da API
jest.mock("axios")

const dragonsData = [
  { id: "1", name: "Dragon 1" },
  { id: "2", name: "Dragon 2" },
  { id: "3", name: "Dragon 3" },
]

beforeEach(() => {
  axios.get.mockResolvedValue({ data: dragonsData })
})

describe("Dragons Page", () => {
  it("renders list of dragons", async () => {
    const { getByText } = render(<DragonsPage />)

    // Verifica se a lista de dragões está sendo renderizada corretamente
    await waitFor(() => {
      dragonsData.forEach((dragon) => {
        const dragonNameElement = getByText(dragon.name)
        expect(dragonNameElement).toBeInTheDocument()
      })
    })
  })

  it("should render the main content with correct text", () => {
    render(<DragonsPage />)
    const mainElement = screen.getByText("List of Dragons")
    expect(mainElement).toBeInTheDocument()
    const detailsElement = screen.getByText("Create new dragon")
    expect(detailsElement).toBeInTheDocument()
  })
})

//createdragonpage
describe("CreateDragon", () => {
  it("renders correctly", () => {
    render(<CreateDragon />)

    // Verifica se os elementos do formulário estão presentes
    expect(screen.getByLabelText("Name:")).toBeInTheDocument()
    expect(screen.getByLabelText("Type:")).toBeInTheDocument()
    expect(screen.getByText("Create Dragon")).toBeInTheDocument()
  })

  it("submits the form with correct data", async () => {
    render(<CreateDragon />)

    // Simula a entrada de dados no formulário
    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: "DragonName" },
    })
    fireEvent.change(screen.getByLabelText("Type:"), {
      target: { value: "DragonType" },
    })

    // Simula o envio do formulário
    fireEvent.click(screen.getByText("Create Dragon"))

    // Aguarda a chamada da API
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon",
        { name: "DragonName", type: "DragonType" }
      )
    })

    // Verifica se o formulário foi redefinido após o envio bem-sucedido
    expect(screen.getByLabelText("Name:")).not.toHaveValue("")
    expect(screen.getByLabelText("Type:")).not.toHaveValue("")
  })
})

//cardcomponent
describe("Card Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Card
        name="Sample Dragon"
        type="Fire"
        formattedDate="2024-03-28"
        handleEdit={() => {}}
      />
    )
    expect(getByText("Sample Dragon")).toBeInTheDocument()
    expect(getByText("Type: Fire")).toBeInTheDocument()
    expect(getByText("Created at: 2024-03-28")).toBeInTheDocument()
  })

  it("calls handleEdit when Edit icon is clicked", () => {
    const handleEditMock = jest.fn()
    const { getByTestId } = render(
      <Card
        name="Sample Dragon"
        type="Fire"
        formattedDate="2024-03-28"
        handleEdit={handleEditMock}
      />
    )

    fireEvent.click(getByTestId("edit-icon"))
    expect(handleEditMock).toHaveBeenCalledTimes(1)
  })
})

//pagedragonbyId
describe("Dragon Component", () => {
  const mockDragonData = {
    id: "1",
    name: "Sample Dragon",
    type: "Fire",
    createdAt: "2024-03-28T12:00:00Z",
  }

  beforeEach(() => {
    // Resetando o mock do axios antes de cada teste
    axios.get.mockReset()
  })

  it("renders correctly", async () => {
    axios.get.mockResolvedValue({ data: mockDragonData })

    const { getByText } = render(<Dragon params={{ id: "1" }} />)

    // Verifica se os dados do dragão são exibidos corretamente
    await waitFor(() => expect(getByText("Sample Dragon")).toBeInTheDocument())
    await waitFor(() => expect(getByText("Type: Fire")).toBeInTheDocument())
    await waitFor(() =>
      expect(getByText("Created at: 28/3/2024")).toBeInTheDocument()
    )
  })
})
