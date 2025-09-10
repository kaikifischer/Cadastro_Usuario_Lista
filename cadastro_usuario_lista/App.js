import { StatusBar } from 'expo-status-bar';
import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import styles from './styles';
// import iconTelefone from './assets/phone.png'; // Não é mais necessário
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

export default function App() {

    // 1. Estados atualizados para o cadastro de usuário
    const [id, setId] = useState();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        carregaDados();
    }, []);

    function createUniqueId() {
        return Date.now().toString();
    }

    async function salvaDados() {
        // --- Início da Validação ---
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
            return;
        }
        if (!email.includes('@')) {
            Alert.alert('Erro', 'O formato do email é inválido. Deve conter um "@".');
            return;
        }
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        if (senha.length < 5) {
            Alert.alert('Erro', 'A senha deve ter no mínimo 5 caracteres.');
            return;
        }
        if (!/[A-Z]/.test(senha)) {
            Alert.alert('Erro', 'A senha deve conter pelo menos uma letra maiúscula.');
            return;
        }
        if (!/[0-9]/.test(senha)) {
            Alert.alert('Erro', 'A senha deve conter pelo menos um número.');
            return;
        }
        // --- Fim da Validação ---

        let novoRegistro = (id == null);

        let obj = {
            id: novoRegistro ? createUniqueId() : id,
            nome: nome,
            email: email,
            senha: senha, // Apenas a senha principal é salva
        };

        try {
            let novaLista = [];
            if (novoRegistro) {
                novaLista = [...contatos, obj];
            } else {
                novaLista = contatos.map(c => (c.id === id ? obj : c));
            }
            setContatos(novaLista);
            
            const jsonValue = JSON.stringify(novaLista);
            await AsyncStorage.setItem('@contatos', jsonValue);
            
            limparCampos();
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function carregaDados() {
        try {
            const jsonValue = await AsyncStorage.getItem('@contatos');
            setContatos(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function editar(identificador) {
        const contato = contatos.find(contato => contato.id == identificador);
        if (contato) {
            setId(contato.id);
            setNome(contato.nome);
            setEmail(contato.email);
            setSenha(contato.senha);
            setConfirmarSenha(contato.senha);
        }
    }

    function limparCampos() {
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setId(undefined);
        Keyboard.dismiss();
    }

    async function efetivaExclusaoTodosRegistros() {
        try {
            await AsyncStorage.removeItem('@contatos');
            setContatos([]); // Limpa o estado para atualizar a tela
            Alert.alert('Registros removidos!');
        }
        catch (e) {
            Alert.alert(e.toString());
        }
    }

    function apagarTudo() {
        Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os contatos?', [
            { text: 'Sim, confirmo!', onPress: () => efetivaExclusaoTodosRegistros() },
            { text: 'Não!!!', style: 'cancel' }
        ]);
    }

    function removerElemento(identificador) {
        Alert.alert('Atenção', 'Confirma a remoção do contato?', [
            { text: 'Sim', onPress: () => efetivaRemoverContato(identificador) },
            { text: 'Não', style: 'cancel' }
        ]);
    }

    async function efetivaRemoverContato(identificador) {
        try {
            const novaLista = contatos.filter(contato => contato.id != identificador);
            setContatos(novaLista);
            
            const jsonValue = JSON.stringify(novaLista);
            await AsyncStorage.setItem('@contatos', jsonValue);
            
            Alert.alert('Contato apagado com sucesso!!!');
            limparCampos();
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: 'blue', width: '100%', textAlign: 'center', padding: 10 }}>
                Cadastro de Usuários
            </Text>

            <ScrollView style={styles.areaFormulario}>
                <View style={styles.areaCampo}>
                    <Text style={styles.labelCampo}>Nome</Text>
                    <TextInput
                        style={styles.caixaTexto}
                        onChangeText={setNome}
                        value={nome}
                    />
                </View>
                <View style={styles.areaCampo}>
                    <Text style={styles.labelCampo}>Email</Text>
                    <TextInput
                        style={styles.caixaTexto}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.areaCampo}>
                    <Text style={styles.labelCampo}>Senha</Text>
                    <TextInput
                        style={styles.caixaTexto}
                        onChangeText={setSenha}
                        value={senha}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.areaCampo}>
                    <Text style={styles.labelCampo}>Confirmar Senha</Text>
                    <TextInput
                        style={styles.caixaTexto}
                        onChangeText={setConfirmarSenha}
                        value={confirmarSenha}
                        secureTextEntry={true}
                    />
                </View>
            </ScrollView>

            <View style={styles.areaBotoes}>
                <TouchableOpacity style={styles.botao} onPress={salvaDados}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={limparCampos}>
                    <Text style={styles.textoBotao}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={apagarTudo}>
                    <Text style={styles.textoBotao}>Apagar tudo</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.listaContatos}>
                {contatos.map(contato => (
                    <View style={styles.contato} key={contato.id}>
                        <View style={styles.dadosContato}>
                            <Text style={styles.listaNome}>{contato.nome}</Text>
                            <View style={styles.dadosListaEmail}>
                                <Ionicons name="mail" size={16} color="#333" />
                                <Text style={styles.listaEmail}>{contato.email}</Text>
                            </View>
                        </View>
                        <View style={styles.botoesAcao}>
                            <TouchableOpacity onPress={() => editar(contato.id)}>
                                <Entypo name="edit" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removerElemento(contato.id)}>
                                <FontAwesome name="remove" size={28} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}