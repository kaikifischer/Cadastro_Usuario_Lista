import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        paddingTop: 40,
    },
    areaFormulario: {
        width: '90%',
        marginVertical: 20,
    },
    areaCampo: {
        marginBottom: 15,
    },
    labelCampo: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333',
    },
    caixaTexto: {
        borderColor: "#ccc",
        borderWidth: 1,
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 20,
    },
    botao: {
        width: '30%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040d59',
    },
    botaoApagarTudo: {
        backgroundColor: '#d9534f',
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listaContatos: {
        width: '90%',
        flex: 1,
    },
    contato: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        // Sombra para dar um efeito elevado
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    dadosContato: {
        flex: 1, // Ocupa a maior parte do espaço
    },
    listaNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dadosListaEmail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    listaEmail: {
        color: "#555",
        fontSize: 14,
        marginLeft: 5,
    },
    botoesAcao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 70, // Largura fixa para os botões de ação
    },
});

export default styles;