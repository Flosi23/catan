package main

import (
	"github.com/pkg/errors"
	"github.com/spf13/viper"
)

type config struct {
	Logging struct {
		Level string `mapstructure:"level"`
	} `mapstructure:"logging"`
	HTTP struct {
		Addr string `mapstructure:"addr"`
	} `mapstructure:"http"`
}

func readConfig() (config, error) {
	v := viper.New()

	v.SetConfigName("catand")
	v.SetConfigType("yaml")
	v.AddConfigPath("conf")
	v.AddConfigPath(".")

	if err := v.ReadInConfig(); err != nil {
		return config{}, errors.WithMessage(err, "failed to read config")
	}

	cfg := config{}
	if err := v.Unmarshal(&cfg); err != nil {
		return config{}, errors.WithMessage(err, "failed to unmarshal config")
	}
	return cfg, nil
}
