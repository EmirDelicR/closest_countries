"use client";

import { Badge, Center, Grid, Group, Loader, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { getUserGeolocationByIP } from "../actions/ip";
import { useEffect } from "react";

export default function IpWidget() {
  const {
    data,
    mutate: server_getUserGeolocationByIP,
    isPending,
    isError,
    isIdle,
  } = useMutation({
    mutationFn: getUserGeolocationByIP,
  });

  useEffect(() => {
    server_getUserGeolocationByIP();
  }, []);

  if (isPending || isIdle) {
    return (
      <Group mt={50} justify="center" mb="lg">
        <Loader type="bars" role="loader" />
      </Group>
    );
  }

  if (isError) {
    return (
      <Group mt={50} justify="center" mb="lg">
        <Text c="red">Fail to load data</Text>
      </Group>
    );
  }

  if (!data) {
    return (
      <Group mt={50} justify="center">
        <Text>There is no current information.</Text>
      </Group>
    );
  }

  return (
    <Center mt={50}>
      <Grid maw={"200px"}>
        <Grid.Col span={6}>City:</Grid.Col>
        <Grid.Col span={6}>
          <Badge>{data.city}</Badge>
        </Grid.Col>
        <Grid.Col span={6}>Country:</Grid.Col>
        <Grid.Col span={6}>
          <Badge>{data.country}</Badge>
        </Grid.Col>
        <Grid.Col span={6}>Latitude:</Grid.Col>
        <Grid.Col span={6}>
          <Badge>{data.lat}</Badge>
        </Grid.Col>
        <Grid.Col span={6}>Longitude:</Grid.Col>
        <Grid.Col span={6}>
          <Badge>{data.lon}</Badge>
        </Grid.Col>
      </Grid>
    </Center>
  );
}
