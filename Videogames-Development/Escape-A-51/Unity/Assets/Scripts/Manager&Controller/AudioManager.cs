using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioManager : MonoBehaviour
{
    #region SINGLETON

    private static AudioManager _instance;
    public static AudioManager Instance
    {
        get { return _instance; }
    }

    void Awake()
    {
        if (_instance == null)
        {
            _instance = this;
            DontDestroyOnLoad(this.gameObject);
        }
        else
        {
            Destroy(this);
        }
    }
    #endregion


    public AudioSource[] _sfx;
    public AudioSource[] _ui;
    public AudioSource[] _background;
    public GameObject audioPrefab;
    public bool isMute;

    [SerializeField] private int _sfxLength, _uiLength, _backgroundLength;

    

    private void Start()
    {
        AudioInitialize();
    }

    void AudioInitialize()
    {
        _sfx = new AudioSource[_sfxLength];
        _ui = new AudioSource[_uiLength];
        _background = new AudioSource[_backgroundLength];
        
        for (int i = 0; i < _sfxLength; i++)
        {
            GameObject audioGO = Instantiate(audioPrefab, transform);
            _sfx[i] = audioGO.GetComponent<AudioSource>();
            AudioSource temp = audioGO.GetComponent<AudioSource>();
            if (i == 0)
            {
                temp.clip = ClipsManager.Instance.GetClipByName("JetPack_SFX");
            }
            else
            {
                temp.clip = ClipsManager.Instance.GetClipByName("Explosion");
                temp.loop = false;
            }
            
            _sfx[i] = audioGO.GetComponent<AudioSource>();
            _sfx[i].Stop();
        }
        for (int i = 0; i < _uiLength; i++)
        {
            GameObject audioGO = Instantiate(audioPrefab, transform);
            _ui[i] = audioGO.GetComponent<AudioSource>();
        }
        for (int i = 0; i < _backgroundLength; i++)
        {
            GameObject audioGO = Instantiate(audioPrefab, transform);
            AudioSource temp = audioGO.GetComponent<AudioSource>();
            temp.clip = ClipsManager.Instance.GetClip(i);
            _background[i] = audioGO.GetComponent<AudioSource>();
        }
    }


    //PLAY
    public AudioSource PlaySFX(AudioClip clip, bool loop = false, int channel = -1, float vol = 1f)
    {
        return Play(_sfx, clip, loop, channel, vol);
    }

    public AudioSource PlayUI(AudioClip clip, bool loop = false, int channel = -1, float vol = 1f)
    {
        return Play(_ui, clip, loop, channel, vol);
    }

    public AudioSource PlayBackground(AudioClip clip, bool loop = false, int channel = -1, float vol = 1f)
    {
        return Play(_background, clip, loop, channel, vol);
    }

    private AudioSource Play(AudioSource[] audioAr, AudioClip clip, bool loop, int channel, float vol)
    {
        if (channel == -1)
        {
            for (int i = 0; i < audioAr.Length; i++)
            {
                if (!audioAr[i].isPlaying)
                {
                    audioAr[i].clip = clip;
                    audioAr[i].loop = loop;
                    audioAr[i].volume = vol;
                    channel = i;
                    isMute = false;
                    audioAr[channel].Play();
                    return audioAr[channel];
                }
            }
        }
        else
        {
            audioAr[channel].clip = clip;
            audioAr[channel].loop = loop;
            audioAr[channel].volume = vol;
            isMute = false;
            audioAr[channel].Play();
            return audioAr[channel];
        }
        isMute = false;
        return audioAr[channel];
    }



    //STOP
    void StopSFX(int channel)
    {
        _sfx[channel].Stop();
    }
    public void StopBackground(int channel)
    {
        _background[channel].Stop();
    }
    void StopUI(int channel)
    {
        _ui[channel].Stop();
    }
    public void StopAll()
    {
        for (int i = 0; i < _sfx.Length; i++)
        {
            _sfx[i].Stop();   
        }
        for (int i = 0; i < _ui.Length; i++)
        {
            _ui[i].Stop();
        }
        for (int i = 0; i < _background.Length; i++)
        {
            _background[i].Stop();
        }
        
    }


    //MUTE
    void MuteSFX(int channel)
    {
        _sfx[channel].volume = 0;
    }
    void MuteUI(int channel)
    {
        _ui[channel].volume = 0;
    }
    void MuteBackground(int channel)
    {
        _background[channel].volume = 0;
    }

    public void ToggleMuteAll(bool value)
    {
        for (int i = 0; i < _sfx.Length; i++)
        {
            _background[i].mute = value;
        }
        for (int i = 0; i < _ui.Length; i++)
        {
            _background[i].mute = value;
        }
        for (int i = 0; i < _background.Length; i++)
        {
            _background[i].mute = value;
        }
        isMute = value;
    }
    public void ToggleMuteBackground(bool value, string clipName)
    {
        for (int i = 0; i < _background.Length; i++)
        {
            if (_background[i].clip != null)
            {
                if (_background[i].clip.name == clipName)
                {
                    _background[i].mute = value;
                }
            }
        }
        isMute = value;
    }


    //RESUME
    void ResumeSFX(int channel)
    {
        _sfx[channel].Play();
    }

    void ResumeUI(int channel)
    {
        _ui[channel].Play();
    }

    void ResumeBackground(int channel)
    {
        _background[channel].Play();
    }

    


    //DESAFIO 2
    void ChangeVolume(AudioSource audio, float vol, float speed)
    {
        StartCoroutine(GradualVolumeChange(audio, vol, speed));
    }

    IEnumerator GradualVolumeChange(AudioSource audio, float vol, float speed)
    {
        float deltaVol = (audio.volume - vol);
        while (deltaVol > 0 && audio.volume > vol || deltaVol < 0 && audio.volume < vol)
        {
            audio.volume -= deltaVol * speed;
            yield return new WaitForSeconds(speed);
        }
    }
}
