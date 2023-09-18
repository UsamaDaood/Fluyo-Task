import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import CustomButton from '../../common/Components/CustomButton';
import {Colors} from '../../Utils/Colors';
import {REMOVING_STRING} from '../../Utils/Const';
import {IC_ALL_DONE, IC_CROSS, IC_FLAG, IC_TICK} from '../../Utils/imageSource';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface RestaurantProps {
  navigation: any;
}

const RestaurantScreen: React.FC<RestaurantProps> = ({navigation}) => {
  const [selectOption, setSelectOption] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleLogin, setIsVisibleLogin] = useState<boolean>(true);
  const [localData, setQuestionArr] = useState<any>();
  const localData121 = [
    {
      question: 'The %nn is small.',
      gen_question: 'das %nn ist klein',
      correct_ans_ger: 'hause',
      correct_ans: 'house',
      option: ['folgen', 'schaf', 'Bereiden', 'hause'],
    },
    {
      question: 'The %nn is small',
      gen_question: 'Die %nn ist klein',
      correct_ans_ger: 'Küche',
      correct_ans: 'kitchen',
      option: ['folgen', 'schaf', 'hause', 'Küche'],
    },
    {
      question: 'The %nn is small',
      gen_question: 'Das %nn ist klein',
      correct_ans_ger: 'Zimmer',
      correct_ans: 'room',
      option: ['folgen', 'Zimmer', 'Küche', 'hause'],
    },
    {
      question: 'This %nn is comfortable',
      gen_question: 'Dieser %nn ist bequem',
      correct_ans_ger: 'Stuhl',
      correct_ans: 'chair',
      option: ['Küche', 'Zimmer', 'Stuhl', 'hause'],
    },
    {
      question: 'This %nn is expensive',
      gen_question: 'Dieses %nn ist teuer',
      correct_ans_ger: 'Bett',
      correct_ans: 'bed',
      option: ['Bett', 'Stuhl', 'Bereiden', 'Zimmer'],
    },
  ];

  useEffect(() => {
    auth().onAuthStateChanged((user: any) => {
      console.log('LOG:: I USER SPLASH SCREEN ' + JSON.stringify(user));
      if (user) {
        setIsVisibleLogin(true);
      } else {
        setIsVisibleLogin(true);
      }
    });
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('question')
      .onSnapshot((querySnapshot: any) => {
        console.log(querySnapshot);
        // see next step
        var questionArr: any = [];
        querySnapshot &&
          querySnapshot.forEach((documentSnapshot: any) => {
            console.log('SNAPSHOT ' + JSON.stringify(documentSnapshot.data()));
            questionArr.push({
              ...documentSnapshot.data(),
            });
          });
        // endd for Each Loop
        console.log('LOG:: ' + JSON.stringify(questionArr));
        setQuestionArr(questionArr);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  // get

  // render Question
  const renderQuestionView = (questionObj: any) => {
    console.log(questionObj);

    return (
      <View style={styles.questionView}>
        <Text style={styles.questionNumber}>Q: {index + 1}/5</Text>

        <Text style={styles.titleStyle}>Fill in the missing word.</Text>

        {/* German Language */}
        <Text style={styles.germenLanguageQStyle}>
          {replaceWith(
            questionObj?.question,
            REMOVING_STRING,
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  textDecorationLine: 'underline',
                  fontSize: 20,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                {questionObj?.correct_ans}
              </Text>
            </View>,
          )}
        </Text>

        {/* Question View */}
        <Text style={styles.questionStyle}>
          {/* Question Statement English */}
          {replaceWith(
            questionObj?.question,
            REMOVING_STRING,
            <View>
              {selectOption.trim().length == 0 ? (
                <View
                  style={{
                    paddingTop: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      textAlign: 'center',
                    }}>
                    ___________
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor:
                      isCorrect != null
                        ? isCorrect
                          ? Colors.correctAnsColor
                          : Colors.wrongAnsColor
                        : Colors.white,

                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color:
                        isCorrect != null
                          ? isCorrect
                            ? Colors.white
                            : Colors.white
                          : Colors.black,
                    }}>
                    {selectOption}
                  </Text>
                </View>
              )}
            </View>,
          )}
        </Text>

        {/* render Options */}
        {renderOptions(questionObj?.option)}

        {/* render Button */}
        {renderButton()}
      </View>
    );
  };

  function replaceWith(string: string, replaceThis: string, replacement: any) {
    return (
      string &&
      string
        .split(replaceThis)
        .map(item => <>{item}</>)
        .reduce((acc, x) => (acc === null ? [x] : [acc, replacement, x]), null)
    );
  }
  // Render Options
  const renderOptions = (optionArr: any[]) => {
    return (
      <View style={[styles.optionView]}>
        {optionArr &&
          optionArr.map(data => {
            return (
              <TouchableOpacity
                style={{
                  padding: 3,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor: Colors.white,
                }}
                onPress={() => {
                  setSelectOption(data);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {selectOption == data && (
                    <Image
                      source={IC_TICK}
                      style={{width: 20, height: 20, marginRight: 5}}
                      resizeMode={'cover'}
                    />
                  )}
                  <Text style={styles.optionItem}>{data}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  };

  // render Button
  const renderButton = () => {
    return (
      <View
        style={[
          styles.buttonView,
          {
            backgroundColor:
              isCorrect != null
                ? isCorrect
                  ? Colors.correctAnsColor
                  : Colors.wrongAnsColor
                : Colors.questionBg,
          },
        ]}>
        {isCorrect != null && (
          <View style={styles.answerView}>
            <Text
              style={{fontSize: 19, color: Colors.white, fontWeight: 'bold'}}>
              {isCorrect
                ? 'Great Job!'
                : 'Answer: ' + localData[index]?.correct_ans_ger}
            </Text>
            <Image source={IC_FLAG} style={{width: 20, height: 20}} />
          </View>
        )}

        <CustomButton
          btnString="Continue"
          titleStyle={{
            color:
              isCorrect != null
                ? isCorrect
                  ? Colors.correctAnsColor
                  : Colors.wrongAnsColor
                : selectOption.trim().length > 0
                ? Colors.white
                : Colors.white,
            fontWeight: 'bold',
            fontSize: 18,
          }}
          btnStyle={[
            styles.btnStyle,
            {
              backgroundColor:
                isCorrect != null
                  ? isCorrect
                    ? Colors.white
                    : Colors.white
                  : selectOption.trim().length > 0
                  ? Colors.correctAnsColor
                  : Colors.buttonColor,
            },
          ]}
          onClick={() => {
            if (isCorrect == null) {
              checkAnswers();
            } else {
              if (index < localData.length - 1) {
                setIsCorrect(null);
                setSelectOption('');
                let newIn = index + 1;
                console.log('INDD ' + newIn);
                setIndex(newIn);
              } else {
                setIsVisible(true);
              }
            }
          }}
        />
      </View>
    );
  };

  // check Correctness of QUestion
  const checkAnswers = () => {
    const questionObj = localData[index];
    if (selectOption === questionObj?.correct_ans_ger) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // Modal to complete the Exercise
  const completeExerciseModal = () => {
    return (
      <View>
        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            setIsVisible(false);
          }}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: 'column'}}>
              {/* Original Content */}

              <View style={{flexDirection: 'column'}}>
                <Image
                  source={IC_ALL_DONE}
                  style={styles.allDoneImage}
                  resizeMode={'contain'}
                />

                <Text style={styles.allDoneTitle}>
                  All Done! Just restart now.
                </Text>

                <CustomButton
                  btnString="Restart Quiz Now!"
                  btnStyle={{
                    backgroundColor: Colors.questionBg,
                    marginHorizontal: 20,
                  }}
                  titleStyle={{color: Colors.white}}
                  onClick={() => {
                    setIndex(0);
                    setIsCorrect(null);
                    setIsVisible(false);
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  };

  // Modal Login Anonymus
  // Modal to complete the Exercise
  const LoginModal = () => {
    return (
      <View>
        <Modal
          visible={isVisibleLogin}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            // setIsVisible(false);
          }}>
          <SafeAreaView style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
              }}>
              {/* Original Content */}

              <View style={{flexDirection: 'column'}}>
                <Text style={styles.startText}>
                  To start Quiz Please Login from below.
                </Text>
                <CustomButton
                  btnString="Login Anonymously"
                  btnStyle={{
                    backgroundColor: Colors.questionBg,
                    marginHorizontal: 20,
                  }}
                  titleStyle={{color: Colors.white}}
                  onClick={async () => {
                    // setIsVisibleLogin(false);
                    await loginUser();
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  };

  // user Login
  const loginUser = async () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');

        setIsVisibleLogin(false);
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'column', flex: 1}}>
        {/* Render Question */}
        {renderQuestionView(localData && localData[index])}
        {localData && console.log(localData[index])}
        {/* render Modal to complete Qusstions */}
        {completeExerciseModal()}
        {/* Login */}
        {LoginModal()}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  questionView: {
    flexDirection: 'column',
    marginTop: 90,
    paddingTop: 30,
    backgroundColor: Colors.questionBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  titleStyle: {
    marginVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17,
    color: Colors.white,
  },
  optionItem: {
    color: Colors.questionBg,

    fontSize: 20,
    fontWeight: 'bold',
  },
  optionView: {
    alignSelf: 'center',
    marginTop: 10,
    width: 200,
  },
  btnStyle: {
    padding: 20,
    backgroundColor: Colors.buttonColor,
    borderRadius: 20,
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  allDoneImage: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  allDoneTitle: {
    fontSize: 21,
    fontStyle: 'normal',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.buttonColor,
    marginBottom: 30,
  },
  germenLanguageQStyle: {
    color: Colors.white,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  questionStyle: {
    color: Colors.white,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30,
  },
  questionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  answerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 20,
  },
  startText: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export default RestaurantScreen;
